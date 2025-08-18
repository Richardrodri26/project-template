"use client"
import { Card, CardContent } from "@/components/ui/card"
import { CardView } from "./CardView"
import type { BaseDataItem, ResponsiveTableProps } from "./ResponsiveTable.interfaces"
import { useMediaQuery } from "@/hooks/use-media-query"
import { DataTableResponsive } from "./dataTableResponsive"

export function ResponsiveTable<TData, TValue>({
  table,
  data = [],
  columns,
  cardFields,
  title,
  description,
  loading = false,
  onRowClick,
  cardTitle,
  cardSubtitle,
  emptyMessage,
  className = "",
  actionComponent
}: ResponsiveTableProps<TData, TValue>) {
  const isMobile = useMediaQuery("(max-width: 1024px)")

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div>
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      )}


      {/* Content */}
      {isMobile ? (
        <CardView
          data={data}
          actionComponent={actionComponent}
          fields={cardFields}
          onCardClick={onRowClick}
          title={cardTitle}
          subtitle={cardSubtitle}
          emptyMessage={emptyMessage}
          loading={loading}
        />
      ) : (
        <Card>
          <CardContent className="p-6">
            <DataTableResponsive columns={columns} table={table} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
