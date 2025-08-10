import { TableHeadToggleWithContext } from "@/components/DataTable/TableToggle";
import type { IExternalState } from "@/interfaces/ExternalState";
import type { Column } from "@tanstack/react-table";
import { type ComponentType, useState } from "react";
import { useTableContext } from "../table.context";
import { BooleanFilter } from "./BooleanFilter";
import { DateFilter } from "./DateFilter";
import { NumberFilter } from "./NumberFilter";
import { OrderTh } from "./OrderComponent";
import { TextFilter } from "./SingleFilter";
import { StateFilter } from "./StateFilter";
import type { filterProps } from "./tableUtilityTypes";

/*----- config -----*/

type displayThMenuProps = Column<any, any> & { label?: string | null; Filter?: ComponentType<filterProps>; enableSorting?: boolean };

/*----- components -----*/

export const DisplayThMenu = ({ label = null, Filter, enableSorting = false, ...column }: displayThMenuProps) => {
  const { filterType } = column.columnDef.meta || {};

  const [openFilter, setOpenFilter] = useState(false);

  const externalPopoverState: IExternalState<boolean> = {
    state: openFilter,
    setter: setOpenFilter,
  };

  // update component
  useTableContext(state => state.table?.getState());

  if (!column.id) return 'No id provided';

  return (
    <TableHeadToggleWithContext column={column} externalPopoverState={externalPopoverState} title={label || column.id} isActiveIf={Boolean(column.getIsSorted() || column.getFilterValue())}>
      <>
        {column.getCanSort() || enableSorting ? <OrderTh id={column.id} /> : null}

        {filterType ? (
          <>
            {
              {
                TextFilter: <TextFilter id={column.id} />,
                StateFilter: <StateFilter column={column} />,
                DateFilter: <DateFilter id={column.id} externalPopoverState={externalPopoverState} />,
                BooleanFilter: <BooleanFilter column={column} />,
                NumberFilter: <NumberFilter id={column.id} />,
              }[filterType]
            }
          </>
        ) : null}

        {Filter ? <Filter id={column.id} /> : null}
      </>
    </TableHeadToggleWithContext>
  );
};
