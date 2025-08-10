import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { type Column } from '@tanstack/react-table';

interface IBooleanFilterProps {
  column: Column<any, any>;
}

export const BooleanFilter = ({ column }: IBooleanFilterProps) => {
  // const columnId = column.id;

  const stateOptions = [
    { label: 'Activo', value: true, index: 1 },
    { label: 'Inactivo', value: false, index: 0 },
  ];

  const currentFilterValue = column?.getFilterValue() as boolean | undefined;

  const onClickBoolean = (value: boolean) => {
    if (currentFilterValue === value) {
      column.setFilterValue(undefined);
      return;
    }

    column.setFilterValue(value);
  };

  const valueToShow = (stateOptions.find(option => option.index === (currentFilterValue as unknown as number))?.value || stateOptions.find(option => option.value === currentFilterValue)?.value) ?? undefined;

  return (
    <div>
      <p className='font-medium text-sm text-tundora'>Seleccione los estados a filtrar</p>

      <div>
        {stateOptions?.map((option, index) => (
          <div key={index} className='flex items-center gap-2 py-2 pr-2 pl-4'>
            <Checkbox id={option.label} checked={option.value === valueToShow} onCheckedChange={() => onClickBoolean(option.value)} />
            <Label htmlFor={option.label} className='font-medium text-sm'>
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
