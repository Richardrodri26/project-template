import { ACTION_COLUMN_ID } from "@/constants/TableConstants";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import type { VisibilityState } from "@tanstack/react-table";
import { GripVerticalIcon, ChevronDown, Eye, EyeOff, Columns3 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTableContext } from "../table.context";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface OrderAndVisibilityColumnsProps {
  buttonLabel?: string;
}

function SortableItem(props: {
  id: string;
  header: string | React.ReactNode;
  visible: boolean;
  toggle: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className='flex items-center justify-between gap-2 rounded p-1.5 hover:bg-navy-light'>
      <div className='flex items-center gap-2'>
        <GripVerticalIcon className='h-4 w-4 cursor-grab text-tundora-light-active dark:text-navy-dark' {...listeners} {...attributes} />
        <span className='flex-1 truncate font-medium text-base text-navy-normal dark:text-navy-dark'>{props.header}</span>
      </div>
      <button className='text-navy-normal dark:text-navy-dark' onClick={props.toggle} aria-label='Toggle visibility' type='button'>
        {props.visible ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
      </button>
    </div>
  );
}

export function OrderAndVisibilityColumns({ buttonLabel = 'Columnas' }: OrderAndVisibilityColumnsProps) {
  const [table, setTable] = useTableContext(state => state.table);

  // ====== FUENTES: trabajar SIEMPRE con leaf columns ======
  const leafColumns = table?.getAllLeafColumns() ?? [];

  // Orden por defecto (todas las hojas en el orden actual de la tabla)
  const defaultLeafOrder = useMemo(() => leafColumns.map(c => c.id!).filter(id => id && id !== ACTION_COLUMN_ID), [leafColumns]);

  // Estado actual
  const state = table?.getState();
  const rawOrder = (state?.columnOrder as string[]) ?? [];
  const columnVisibility = (state?.columnVisibility as VisibilityState) ?? {};

  // Normaliza: usa el order del estado si está; si no, usa el por defecto
  const order: string[] = useMemo(() => {
    const setLeaf = new Set(defaultLeafOrder);
    const cleaned = rawOrder.filter(id => setLeaf.has(id));
    return cleaned.length ? cleaned : defaultLeafOrder;
  }, [rawOrder, defaultLeafOrder]);

  // Mapa de índice para pintar las listas en el orden "real"
  const orderIndex = useMemo(() => {
    const m = new Map<string, number>();
    order.forEach((id, i) => m.set(id, i));
    return m;
  }, [order]);

  // Visibilidad por defecto (todas visibles)
  const columnsVisibilityDef = useMemo(() => {
    return leafColumns.reduce((acc, c) => {
      if (c.id && c.id !== ACTION_COLUMN_ID) acc[c.id] = true;
      return acc;
    }, {} as VisibilityState);
  }, [leafColumns]);

  // ====== Iniciales para Reset ======
  const [initialOrderState, setInitialOrderState] = useState<string[]>([]);
  const [initialVisibilityState, setInitialVisibilityState] = useState<VisibilityState>({});

  // ====== Helpers de grupos ======
  const allColumns = table?.getAllColumns() ?? [];
  const groupColumns = useMemo(() => allColumns.filter((c: any) => Array.isArray(c.columns) && c.columns.length > 0), [allColumns]);

  const groupLeafIds = (group: any): string[] => {
    const ids =
      group
        ?.getLeafColumns?.()
        ?.map((c: any) => c.id as string)
        ?.filter((id: string) => id && id !== ACTION_COLUMN_ID) ?? [];
    // Ordena por el orden global actual
    return ids.sort((a: string, b: string) => (orderIndex.get(a) ?? 9999) - (orderIndex.get(b) ?? 9999));
  };

  // Hojas sin grupo
  const ungroupedLeafIds = useMemo(() => {
    const ids =
      leafColumns
        .filter((c: any) => !c.parent) // sin padre => top-level no agrupada
        .map(c => c.id as string)
        .filter(id => id && id !== ACTION_COLUMN_ID) ?? [];
    return ids.sort((a, b) => (orderIndex.get(a) ?? 9999) - (orderIndex.get(b) ?? 9999));
  }, [leafColumns, orderIndex]);

  // ====== Acciones ======
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // (Opcional) Restringir a mover dentro del mismo grupo
    const sameGroup = () => {
      const a = table?.getColumn(active.id as string);
      const b = table?.getColumn(over.id as string);
      return a?.parent?.id === b?.parent?.id;
    };
    if (!sameGroup()) return;

    const oldIndex = order.indexOf(active.id as string);
    const newIndex = order.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    setTable((draft: any) => {
      if (initialOrderState.length === 0) setInitialOrderState(defaultLeafOrder);
      draft.order = arrayMove(order, oldIndex, newIndex);
    });
  };

  const onToggleVisibility = (columnId: string) => {
    setTable((draft: any) => {
      const hasInitial = Object.keys(initialVisibilityState).length > 0;
      if (!hasInitial) setInitialVisibilityState(columnsVisibilityDef);
      if (!draft.columnVisibility) draft.columnVisibility = {};
      const current = draft.columnVisibility[columnId];
      // si es undefined, asumir true como base
      draft.columnVisibility[columnId] = !(current ?? true);
    });
  };

  const onReset = () => {
    setTable((draft: any) => {
      draft.columnVisibility = Object.keys(initialVisibilityState).length ? initialVisibilityState : columnsVisibilityDef;
      draft.order = initialOrderState.length ? initialOrderState : defaultLeafOrder;
    });
    // limpiamos memorias
    setInitialVisibilityState({});
    setInitialOrderState([]);
  };

  // ====== Validaciones para habilitar Reset ======
  const validateOrder = useMemo(() => defaultLeafOrder.every((el, i) => el === order[i]), [defaultLeafOrder, order]);
  const validateVisibility = useMemo(() => {
    const keys = Object.keys(columnsVisibilityDef);
    return keys.every(k => (columnVisibility?.hasOwnProperty(k) ? columnVisibility[k] : true) === columnsVisibilityDef[k]);
  }, [columnsVisibilityDef, columnVisibility]);

  const validateInitialState = !validateOrder || !validateVisibility;
  const canReset = initialOrderState.length > 0 || Object.keys(initialVisibilityState).length > 0 || validateInitialState;

  // ====== Render ======
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='flex items-center gap-1.5' variant='outline' size='sm'>
          <Columns3 className='size-6' />
          {buttonLabel}
          <ChevronDown className='size-6' />
        </Button>
      </PopoverTrigger>

      <PopoverContent align='end' className='w-auto min-w-60 p-4'>
        <div className='mb-2 flex items-center justify-between'>
          <p className='font-bold text-sm text-tundora-dark'>Columnas</p>
          <Button disabled={!canReset} variant='link' onClick={onReset} type='button'>
            Restablecer
          </Button>
        </div>

        <ScrollArea className='max-h-64 overflow-y-auto pr-2'>
          {/* altura limitada con scroll */}
          <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
            {/* Secciones por grupo */}
            {groupColumns.map((group: any) => {
              const ids = groupLeafIds(group);
              if (!ids.length) return null;
              const groupHeader = typeof group.columnDef?.header === 'string' ? group.columnDef.header : (group.columnDef?.header ?? group.id);

              return (
                <div key={group.id} className='mb-3'>
                  <p className='mb-1 font-semibold text-sm text-tundora-dark'>{groupHeader}</p>
                  <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                    {ids.map((colId: string) => {
                      const col = table?.getColumn(colId);
                      if (!col) return null;
                      const header = col.columnDef?.meta?.columnLabel ?? col.id;
                      const isVisible = (columnVisibility?.[colId] ?? true) as boolean;

                      return <SortableItem key={colId} id={colId} header={header} visible={isVisible} toggle={() => onToggleVisibility(colId)} />;
                    })}
                  </SortableContext>
                </div>
              );
            })}

            {/* Cols sin grupo */}
            {ungroupedLeafIds.length > 0 && (
              <div>
                <p className='mb-1 font-semibold text-sm text-tundora-dark'>Otras columnas</p>
                <SortableContext items={ungroupedLeafIds} strategy={verticalListSortingStrategy}>
                  {ungroupedLeafIds.map((colId: string) => {
                    const col = table?.getColumn(colId);
                    if (!col) return null;
                    const header = col.columnDef?.meta?.columnLabel ?? col.id;
                    const isVisible = (columnVisibility?.[colId] ?? true) as boolean;

                    return <SortableItem key={colId} id={colId} header={header} visible={isVisible} toggle={() => onToggleVisibility(colId)} />;
                  })}
                </SortableContext>
              </div>
            )}
          </DndContext>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
