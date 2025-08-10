import type { ColumnDef, Table } from "@tanstack/react-table"
import type { ReactNode } from "react"

export interface BaseDataItem {
  id: string | number
  [key: string]: any
}

export interface CardViewProps<T extends BaseDataItem> {
  data: T[]
  fields: CardField[]
  actions?: CardAction[]
  onCardClick?: (item: T) => void
  title?: (item: T) => string
  subtitle?: (item: T) => string
  emptyMessage?: string
  loading?: boolean
}

export interface CardField {
  key: string
  label: string
  render?: (value: any, item: BaseDataItem) => ReactNode
  className?: string
  priority?: "high" | "medium" | "low" // Para responsive
}

export interface CardAction {
  label: string
  icon?: ReactNode
  onClick: (item: any) => void
  variant?: "default" | "destructive" | "outline"
  show?: (item: BaseDataItem) => boolean
}

export interface DataTableProps<T extends BaseDataItem> {
  data: T[]
  columns: ColumnDef<T>[]
  loading?: boolean
  onRowClick?: (item: T) => void
}

// export interface ResponsiveTableProps<T extends BaseDataItem> {
//   // data: T[]
//   // columns: ColumnDef<T>[]
//   cardFields: CardField[]
//   cardActions?: CardAction[]
//   searchable?: boolean
//   searchPlaceholder?: string
//   title?: string
//   description?: string
//   loading?: boolean
//   onRowClick?: (item: T) => void
//   cardTitle?: (item: T) => string
//   cardSubtitle?: (item: T) => string
//   emptyMessage?: string
//   className?: string
// }

export interface ResponsiveTableProps<TData, TValue> extends BaseDataItem {
  columns: number | ColumnDef<TData, TValue>[];
  // data: TData[]
  table: Table<TData>;
  isLoading?: boolean;
  className?: string;
  containerClassName?: string;

    cardFields: CardField[]
  cardActions?: CardAction[]
}