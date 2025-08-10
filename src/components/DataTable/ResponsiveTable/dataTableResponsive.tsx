"use client"

import { flexRender, type Table as TableType, type ColumnDef } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { getCommonPinningStyles } from "@/components/DynamicTable/cases/getPinningStyles"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: number | ColumnDef<TData, TValue>[];
  // data: TData[]
  table: TableType<TData>;
  isLoading?: boolean;
  className?: string;
  containerClassName?: string;
}


export function DataTableResponsive<TData, TValue>({ columns, table, isLoading = false, className, containerClassName }: DataTableProps<TData, TValue>) {

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('overflow-y-auto overflow-x-hidden rounded-md', containerClassName)}>
      <Table className={cn('', className)}>
        <TableHeader>
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel().rows?.length ? (
            table?.getRowModel().rows.map((row) => (
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
              <TableCell colSpan={typeof columns === 'number' ? columns : columns.length} className="h-24 text-center">
                No hay resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
