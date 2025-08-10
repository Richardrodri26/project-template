import type { IExternalState } from '@/interfaces/ExternalState';
import { cn } from '@/lib/utils';
import type { Column } from '@tanstack/react-table';
import { AlignJustify, FilterIcon, FunnelX } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { DropdownMenuItem, DropdownMenuContent, DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useOrderTh } from '../DynamicTable/utilities/OrderComponent';
import { Button } from '../ui/button';

//#region thead

type TableToggleProps = {
  children: React.ReactNode;
  title: React.ReactNode | string;
  isActiveIf?: any;
  className?: string;
  externalPopoverState?: IExternalState<boolean>;
  column?: Column<any, any>;
};

export const TableHeadToggle = ({ children, isActiveIf = false, title, className, externalPopoverState, column }: TableToggleProps) => {
  const isFiltering = !!column?.getFilterValue(); // True si hay filtro
  const isSorting = !!column?.getIsSorted(); // True si hay orden
  const disabledResetButton = !isFiltering && !isSorting;

  const clearFiltersAndSorting = () => {
    column?.setFilterValue(undefined);
    externalPopoverState?.setter(false);
  };

  return (
    <div className={cn('inline-flex w-full items-center', className)}>
      {title}
      <Popover open={externalPopoverState?.state} onOpenChange={externalPopoverState?.setter}>
        <PopoverTrigger asChild>
          <div className={'ml-0.5 cursor-pointer'}>{isActiveIf ? <FilterIcon className='ml-2 size-4 rounded-sm bg-orange-light-hover p-1 text-orange' /> : <FunnelX className={'ml-1 size-4 rounded-md p-1'} />}</div>
        </PopoverTrigger>
        <PopoverContent className='w-fit min-w-[333px] rounded-lg p-4'>
          <div className='mb-2 flex items-center justify-between border-navy-light-hover border-b pb-2'>
            <h3 className='font-semibold text-sm text-tundora'>{title}</h3>
            {Boolean(column) ? (
              <Button disabled={disabledResetButton} onClick={clearFiltersAndSorting} variant={'link'}>
                Restablecer
              </Button>
            ) : null}
          </div>
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const TableHeadToggleWithContext = ({ children, isActiveIf = false, title, className, externalPopoverState, column }: TableToggleProps) => {
  const { clearSorting } = useOrderTh(column?.id ?? '');

  const currentFilterType = column?.columnDef?.meta?.filterType;

  const currentValue = column?.getFilterValue();

  const isFiltering = !!currentValue || (currentFilterType === 'BooleanFilter' && currentValue !== undefined); // True si hay filtro
  const isSorting = !!column?.getIsSorted(); // True si hay orden
  const disabledResetButton = !isFiltering && !isSorting;

  const clearFiltersAndSorting = () => {
    column?.setFilterValue(null);
    if (column?.getCanSort() && column?.getIsSorted()) {
      clearSorting();
    }
    externalPopoverState?.setter(false);
  };

  return (
    <div className={cn('inline-flex w-full items-center', className)}>
      {title}
      <Popover open={externalPopoverState?.state} onOpenChange={externalPopoverState?.setter}>
        <PopoverTrigger asChild>
          <div className={'ml-0.5 cursor-pointer'}>{isActiveIf ? <FilterIcon className='ml-2 size-4 rounded-sm bg-orange-light-hover p-1 text-orange' /> : <FunnelX className={'ml-1 size-4 rounded-md p-1'} />}</div>
        </PopoverTrigger>
        <PopoverContent className='w-fit min-w-[333px] rounded-lg p-4'>
          <div className='mb-2 flex items-center justify-between border-navy-light-hover border-b pb-2'>
            <h3 className='font-semibold text-sm text-tundora'>{title}</h3>
            {Boolean(column) ? (
              <Button disabled={disabledResetButton} onClick={clearFiltersAndSorting} variant={'link'}>
                Restablecer
              </Button>
            ) : null}
          </div>
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
};

//#region tbody

type dropDownItem = typeof DropdownMenuItem;
type TableRowDropDownToggleProps = {
  children: (item: dropDownItem) => React.ReactNode;
  content?: React.ComponentProps<typeof DropdownMenuContent>;
};

export const TableRowDropDownToggle = ({ children, content = { align: 'start', side: 'right' } }: TableRowDropDownToggleProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className='rounded-full p-[9px] transition-shadow hover:shadow-inner'>
      <AlignJustify className='size-4' />
    </DropdownMenuTrigger>
    <DropdownMenuContent {...content}>{children(DropdownMenuItem)}</DropdownMenuContent>
  </DropdownMenu>
);
