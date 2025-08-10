import type { TC } from "@/interfaces/ReactComps";
import type { dateFilterValue, filterProps } from "./tableUtilityTypes";
import type { IExternalState } from "@/interfaces/ExternalState";
import { useMemo, useState } from "react";
import { DateTimePicker } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useTableContext, type twoFilterConfig } from "../table.context";

export const DateFilter: TC<filterProps & { externalPopoverState?: IExternalState<boolean> }> = ({ id = '', externalPopoverState }) => {
  // hooks
  const { dateFilters, submitDateFilters, setDateById } = useDateFilter({ id });
  // const currentDate = useMemo(() => getCurrentDateWithFormat('yyyy-MM-dd'), []);

  const fromDate = useMemo(() => (dateFilters?.major ? new Date(dateFilters?.major) : undefined), [dateFilters?.major]);
  const toDate = useMemo(() => (dateFilters?.minor ? new Date(dateFilters?.minor) : undefined), [dateFilters?.minor]);

  const handleFromDateChange = (date: Date | undefined) => {
    setDateById(date ?? null, 'major');
  };

  const handleToDateChange = (date: Date | undefined) => {
    setDateById(date ?? null, 'minor');
  };

  const handleCancel = () => {
    setDateById(null, 'major');
    setDateById(null, 'minor');
    externalPopoverState?.setter(false);
  };

  const disableConfirmButton = !fromDate || !toDate;

  return (
    <>
      <div className='flex flex-col gap-1 font-normal'>
        <div className='flex items-center justify-between gap-2'>
          <DateTimePicker label='Desde' className='flex-1 [&>div>button]:w-full [&>div]:w-full' value={fromDate} onDateChange={handleFromDateChange} showDate={true} />
          <DateTimePicker label='Hasta' className='flex-1 [&>div>button]:w-full [&>div]:w-full' value={toDate} onDateChange={handleToDateChange} showDate={true} popoverAlign='end' />
        </div>

        {/* <label htmlFor='major' className='flex flex-col text-min'>
          <strong>Mayor a</strong>
          <input type='datetime-local' id='major' value={dateFilters?.major ?? ''} onChange={handleDates} max={dateFilters?.minor === '' ? currentDate : dateFilters?.minor} />
        </label>

        <label htmlFor='minor' className='flex flex-col text-min'>
          <strong>Menor a</strong>
          <input type='datetime-local' id='minor' value={dateFilters?.minor ?? ''} onChange={handleDates} min={dateFilters?.major} max={currentDate} />
        </label> */}

        <div className='mt-2 flex items-center justify-between gap-4 border-navy-light-hover border-t pt-4 [&>button]:flex-1'>
          <Button onClick={handleCancel} variant={'destructive'}>
            Cancelar
          </Button>
          <Button disabled={disableConfirmButton} onClick={submitDateFilters}>
            Aplicar
          </Button>
        </div>
      </div>
    </>
  );
};

/*----- hooks -----*/
/**
 * hook than save into table context the
 * @param id
 * @returns
 */
const useDateFilter = ({ id }: Required<filterProps>) => {
  // hooks
  const [table] = useTableContext(state => state.table);
  const [columnConfig] = useTableContext(state => state.table?.getColumn(id)!);

  const defaultValue = useMemo<dateFilterValue>(() => {
    // default value from the table
    const originalDate = columnConfig.getFilterValue() as any;

    const alternativeValue = [
      { id: 'major', value: originalDate?.major },
      { id: 'minor', value: originalDate?.minor },
    ];
    return (
      ((columnConfig.getFilterValue() as twoFilterConfig)?.value || alternativeValue)?.reduce(
        (acc, filt) => {
          acc[filt.id] = filt.value;
          return acc;
        },
        {} as Record<string, string>,
      ) ?? {}
    );
  }, []);

  const [dateFilters, setDateFilters] = useState<dateFilterValue>(defaultValue); // value than submit;

  // functions ----

  // set state values
  const handleDates = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setDateFilters(currentDates => {
      let newDates = Object.assign({}, currentDates);
      if (!value) {
        delete newDates[id as keyof dateFilterValue];
        return newDates;
      }
      if (id in currentDates) return Object.assign(newDates, { [id]: value });
      return Object.assign({ [id]: value }, newDates);
    });
  };

  const setDateById = (date: Date | null, id: keyof dateFilterValue) => {
    setDateFilters(currentDates => {
      const newDates = { ...currentDates };
      if (!date) {
        delete newDates[id];
      } else {
        // formateamos a ISO (yyyy-MM-ddTHH:mm)
        const isoString = date.toISOString().slice(0, 16);
        newDates[id] = isoString;
      }
      return newDates;
    });
  };

  // submit the values to table
  const submitDateFilters = () => {
    const hasValue = Object.keys(dateFilters).length;
    table?.setPagination({ pageIndex: 1, pageSize: table?.getState().pagination.pageSize });
    columnConfig.setFilterValue(hasValue ? dateFilters : undefined);
  };

  return { dateFilters, handleDates, submitDateFilters, setDateById };
};
