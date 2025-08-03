import { AdminLayout } from '@/features/Layouts/AdminLayout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/__app')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminLayout><Outlet/></AdminLayout>
}
