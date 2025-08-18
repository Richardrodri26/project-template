"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { BaseDataItem, CardViewProps } from "./ResponsiveTable.interfaces"

export function CardView<T extends BaseDataItem>({
  data,
  fields,
  onCardClick,
  title,
  subtitle,
  emptyMessage = "No hay elementos para mostrar",
  loading = false,
  actionComponent: ActionComp
}: CardViewProps<T>) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (data?.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {data.map((item) => {

        return (
          <Card
            key={item.id}
            className={`w-full transition-colors ${onCardClick ? "cursor-pointer hover:bg-muted/50" : ""}`}
            onClick={() => onCardClick?.(item)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  {title && <h3 className="font-semibold text-lg truncate">{title(item)}</h3>}
                  {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle(item)}</p>}
                </div>
{ActionComp && ActionComp(item)}
                
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {fields?.filter((field) => field.priority !== "low" || window.innerWidth > 640)
                  .map((field) => {
                    const value = item[field.key]
                    return (
                      <div key={field.key} className={field.className}>
                        <span className="text-muted-foreground block">{field.label}:</span>
                        <div className="font-medium mt-1">{field.render ? field.render(value, item) : value}</div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
