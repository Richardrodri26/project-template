import { type CSSProperties } from 'react';
import { type Column } from '@tanstack/react-table';

//These are the important styles to make sticky column pinning work!
//Apply styles like this using your CSS strategy of choice with this kind of logic to head cells, data cells, footer cells, etc.
//View the index.css file for more needed styles such as border-collapse: separate
export const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();

  return {
    boxShadow: isPinned && column.getIsLastColumn('left') ? '-4px 0 4px -4px gray inset' : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    position: isPinned ? 'sticky' : 'inherit',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
