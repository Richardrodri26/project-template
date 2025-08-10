import type { ColumnDef } from "@tanstack/react-table"
import type { BaseDataItem, CardField } from "./ResponsiveTable.interfaces"

export function extractCardFields<T extends BaseDataItem>(
  columns: ColumnDef<T>[],
  showAllFields = false,
  defaultPriority: "high" | "medium" | "low" = "medium",
): CardField[] {
  return columns
    .filter((column) => {
      // Excluir columnas de acciones
      if (column.id === "actions" || column.id === "select") return false

      // Si tiene configuración de cardField explícita
      if (column.meta?.cardField) {
        return column.meta.cardField.show !== false
      }

      // Si showAllFields es true, incluir todas las columnas con accessorKey
      return showAllFields && column.accessorKey
    })
    .map((column): CardField => {
      const cardMeta = column.meta?.cardField
      const accessorKey = column.accessorKey as string

      // Obtener el label del header o usar el accessorKey
      let label = accessorKey
      if (cardMeta?.label) {
        label = cardMeta.label
      } else if (typeof column.header === "string") {
        label = column.header
      }

      return {
        key: accessorKey,
        label: label,
        render: cardMeta?.render,
        className: cardMeta?.className,
        priority: cardMeta?.priority || defaultPriority,
      }
    })
}

export function getCardValue<T extends BaseDataItem>(item: T, key: string): any {
  return key.split(".").reduce((obj, k) => obj?.[k], item)
}
