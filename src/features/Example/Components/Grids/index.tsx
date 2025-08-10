import ContextDataTable from "@/components/DynamicTable/LayoutTable";
import { useGetExampleTable } from "../../hooks/useGetExampleTable";
import { GraphPaginationWrapper } from "@/components/DynamicTable/utilities/Pagination";

export const ExampleGrid = () => {
  const { isError } = useGetExampleTable({});
  if (isError) return <div className='h-10 p-0 text-red-600 '>¡Oops, hubo un error!</div>;

  return (
    <>
      <ContextDataTable />
      <GraphPaginationWrapper />
    </>
  );
};
