import { ContentLayout } from '@/components/admin-panel/content-layout'
import { SsrTableProvider } from '@/components/DynamicTable'
import { ExampleGrid } from '@/features/Example/Components/Grids'
import { CardGridActions } from '@/features/Example/Components/Grids/Cell'
import { cardsColumns } from '@/features/Example/Components/Grids/Columns'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContentLayout title="Home">
      <SsrTableProvider actionComponent={(item) => <CardGridActions data={item} />} columns={cardsColumns}>
        <ExampleGrid />
      </SsrTableProvider>
    </ContentLayout>
}

