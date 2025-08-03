

import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout'

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminPanelLayout>{children}</AdminPanelLayout>
  )
}
