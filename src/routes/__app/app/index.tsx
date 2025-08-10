import { ContentLayout } from '@/components/admin-panel/content-layout'
import { SsrTableProvider } from '@/components/DynamicTable'
import { ExampleGrid } from '@/features/Example/Components/Grids'
import { cardsColumns } from '@/features/Example/Components/Grids/Columns'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContentLayout title="Home">
      <SsrTableProvider columns={cardsColumns}>
        <ExampleGrid />
      </SsrTableProvider>
    </ContentLayout>
}

