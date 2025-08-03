import { ContentLayout } from '@/components/admin-panel/content-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContentLayout title="Home">
      <div>Home</div>
    </ContentLayout>
}
