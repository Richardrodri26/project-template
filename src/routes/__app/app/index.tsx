import { ContentLayout } from '@/components/admin-panel/content-layout'
import { SsrTableProvider } from '@/components/DynamicTable'
import { Button } from '@/components/ui/button'
import { ExampleGrid } from '@/features/Example/Components/Grids'
import { CardGridActions } from '@/features/Example/Components/Grids/Cell'
import { cardsColumns } from '@/features/Example/Components/Grids/Columns'
import { ExampleModalForm } from '@/features/Example/Components/Modals/ExampleFormModal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContentLayout title="Home">


    <div>
      <ExampleModalForm formMode='create'>
        <Button variant='default'>Crear nuevo ejemplo</Button>
      </ExampleModalForm>
    </div>

      <SsrTableProvider actionComponent={(item) => <CardGridActions data={item} />} columns={cardsColumns}>
        <ExampleGrid />
      </SsrTableProvider>
    </ContentLayout>
}

