import { ACTION_COLUMN_ID } from '@/constants/TableConstants';
import { createColumnHelper } from '@tanstack/react-table';
import type { Cards } from '@/domain/graphql';
import { DisplayThMenu } from '@/components/DynamicTable';
import { TdLongText } from '@/components/TdLongText';
import { CardGridActions } from './Cell';

const cardColumnHelper = createColumnHelper<Cards>();

export const cardsColumns = [
  cardColumnHelper.display({
    id: ACTION_COLUMN_ID,
    enablePinning: true,
    cell: ({ row }) => <CardGridActions data={row.original} />,
    size: 50,
    maxSize: 50,
  }),
  cardColumnHelper.accessor('description', {
    id: 'descripcion',
    meta: {
      columnLabel: 'Description',
      filterType: 'TextFilter',
      headerProps: {
        style: { width: '100%', flexGrow: 1, flexShrink: 1 },
      },
    },
    header: ({ column }) => <DisplayThMenu label={'Description'} {...column}></DisplayThMenu>,
    cell: ({ getValue }) => <TdLongText>{getValue() || 'N/A'}</TdLongText>,
  }),
  cardColumnHelper.display({
    id: 'createdAt',
    enableSorting: true,
    meta: {
      columnLabel: 'createdAt',
      filterType: 'DateFilter',
      headerProps: {
        style: { minWidth: 200 },
        className: 'min-w-[200px]',
      },
    },
    header: ({ column }) => <DisplayThMenu label={'createdAt'} {...column}></DisplayThMenu>,
  
  }),

];
