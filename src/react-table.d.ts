import '@tanstack/react-table';
import type { CardField } from '@/components/DataTable/ResponsiveTable/ResponsiveTable.interfaces';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    headerProps?: React.ThHTMLAttributes<HTMLTableCellElement>;
    TdProps?: React.TdHTMLAttributes<HTMLTableCellElement>;
    filterType?: 'TextFilter' | 'StateFilter' | 'DateFilter' | 'BooleanFilter' | 'NumberFilter';
    stateFilterOptions?: { label: string; value: any }[];
    columnLabel?: string;
    cardField?: CardField;
  }
}
