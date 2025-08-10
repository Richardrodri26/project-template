
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Column } from '@tanstack/react-table';

interface IStateFilterProps {
  column: Column<any, any>;
}

export const StateFilter = ({ column }: IStateFilterProps) => {
  // const columnId = column.id;

  const stateOptions = column.columnDef.meta?.stateFilterOptions ?? [];

  const currentFilterValue = (column?.getFilterValue() as string[]) || [];

  const onClickStatus = (status: string) => {
    const hasCurrentFilterValue = currentFilterValue?.includes(status);

    if (hasCurrentFilterValue) {
      column.setFilterValue(currentFilterValue.filter(x => x !== status));
    } else {
      column.setFilterValue([...currentFilterValue, status]);
    }
  };

  return (
    <div>
      <p className='font-medium text-sm text-tundora'>Seleccione los estados a filtrar</p>

      <div>
        {stateOptions?.map((option, index) => (
          <div key={index} className='flex items-center gap-2 py-2 pr-2 pl-4'>
            <Checkbox id={option.label} checked={currentFilterValue.includes(option.value)} onCheckedChange={() => onClickStatus(option.value)} />
            <Label htmlFor={option.label} className='font-medium text-sm'>
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
