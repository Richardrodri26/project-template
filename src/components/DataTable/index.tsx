import { type Column, type ColumnDef, type Table as TableType, flexRender } from '@tanstack/react-table';
import { type CSSProperties } from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface DataTableProps<TData, TValue> {
  columns: number | ColumnDef<TData, TValue>[];
  // data: TData[]
  table: TableType<TData>;
  isLoading?: boolean;
  className?: string;
  containerClassName?: string;
}

export function DataTable<TData, TValue>({ columns, table, isLoading = false, className, containerClassName }: DataTableProps<TData, TValue>) {
  // if (isLoading) return <Skeleton style={{ height: 57 * 5 }} className='w-full rounded-md' />;

  return (
    <div className={cn('overflow-y-auto overflow-x-hidden rounded-md', containerClassName)}>
      <Table className={cn('', className)}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className='!border-b-0'>
              {headerGroup.headers.map(header => {
                const { className, style, ...headerProps } = header?.column?.columnDef?.meta?.headerProps || {};

                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn('whitespace-nowrap bg-purple-light font-semibold text-leading-3 text-navy-normal text-sm dark:bg-purple-light-hover dark:text-navy-dark [&_svg]:fill-navy-normal [&_svg]:dark:fill-navy-dark', className)}
                    style={{ ...getCommonPinningStyles(header.column), minWidth: header.column.columnDef.minSize, ...style }}
                    {...headerProps}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <>
              <SkeletonRow columns={columns} />
              <SkeletonRow columns={columns} />
              <SkeletonRow columns={columns} />
              <SkeletonRow columns={columns} />
              <SkeletonRow columns={columns} />
              <SkeletonRow columns={columns} />
              <SkeletonRow columns={columns} />
              <SkeletonRow columns={columns} />
              <SkeletonRow columns={columns} />
              <SkeletonRow columns={columns} />
            </>
          ) : (
            <>
              {table.getRowModel()?.rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => {
                      // Renderizamos primero el contenido original
                      const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext());

                      // Si es null, undefined o '', mostramos '-'
                      const display = cellContent === null || cellContent === undefined || (typeof cellContent === 'string' && cellContent.trim() === '') ? '-' : cellContent;

                      return (
                        <TableCell key={cell.id} {...cell.column.columnDef.meta?.TdProps} style={{ ...getCommonPinningStyles(cell.column), ...cell.column.columnDef.meta?.TdProps?.style }}>
                          {display}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={typeof columns === 'number' ? columns : columns.length} className='h-24 text-center'>
                    <EmptyAsideList />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const EmptyAsideList = () => {
  return (
    <div className='mx-auto my-4 w-28 space-y-[10px] text-center'>
      <img src={`/emptyGrid.svg`} alt='empty list' className='mx-auto h-10 w-14' />
      <p className='font-verdana text-[0.625rem] leading-3'>No se han encontrado resultados</p>
    </div>
  );
};

interface ISkeletonRowProps<TData, TValue> {
  columns: number | ColumnDef<TData, TValue>[];
}

const SkeletonRow = ({ columns }: ISkeletonRowProps<any, any>) => {
  return (
    <TableRow>
      <TableCell colSpan={typeof columns === 'number' ? columns : columns?.length || 0}>
        <Skeleton className='h-[35px] w-full rounded-md bg-navy-light bg-opacity-50' />
      </TableCell>
    </TableRow>
  );
};

function getCommonPinningStyles(column: Column<any>): CSSProperties {
  const isPinned = column.getIsPinned();
  // const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
  // const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');

  if (!isPinned) {
    return {};
  }

  return {
    // boxShadow: isLastLeftPinnedColumn ? '-4px 0 4px -4px gray inset' : isFirstRightPinnedColumn ? '4px 0 4px -4px gray inset' : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    // opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}
