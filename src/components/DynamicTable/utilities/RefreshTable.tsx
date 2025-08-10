import { Button } from "@/components/ui/button";
import { cn, sleep } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


interface IRefreshTableButtonProps {
  queryKey: any[];
  exact?: boolean;
}

export const RefreshTableButton = ({ queryKey, exact }: IRefreshTableButtonProps) => {
  const queryClient = useQueryClient();
  const [refetchLoading, setRefetchLoading] = useState(false);

  const refetchDataLoading = () => {
    toast.info('Consultando información...');
    setRefetchLoading(true);
    sleep(1000).then(() => {
      setRefetchLoading(false);
    });
  };

  const hasDataToRefetch = queryKey.length > 0;

  const refetchData = () => {
    if (!hasDataToRefetch) return;

    queryClient.refetchQueries({
      queryKey: queryKey,
      exact: exact,
    });

    refetchDataLoading();
  };

  return (
    <Button variant={'ghost'} size='icon' className='cursor-pointer [&_svg]:size-6' onClick={refetchData}>
      <RefreshCcw className={cn('fill-blue', { 'animate-spin': refetchLoading })} />
    </Button>
  );
};
