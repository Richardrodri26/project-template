import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

interface TablePaginationProps {
  pageIndex: number; // página actual (base 1 o base 0 según prefieras)
  pageSize: number;
  totalItems: number;

  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
  onSelectPage: (page: number) => void;

  disableNext?: boolean;
  disablePrevious?: boolean;
  disableFirst?: boolean;
  disableLast?: boolean;

  className?: string;
}

export const TablePagination = ({ pageIndex, pageSize, totalItems, onNext, onPrevious, onFirst, onLast, onSelectPage, disableNext, disablePrevious, disableFirst, disableLast, className }: TablePaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className={cn('mt-4 ml-auto flex w-fit items-center gap-6', className)}>
      {/* Navegación */}
      <div className='flex items-center gap-2'>
        <span className='font-medium text-sm text-tundora'>Ir a página</span>
        <Select onValueChange={value => onSelectPage(Number(value))} value={String(pageIndex)}>
          <SelectTrigger className='h-8 w-fit border-tundora text-tundora'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalPages }, (_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Botones */}
      <div className='flex items-center gap-2'>
        <Button variant='ghost' onClick={onFirst} disabled={disableFirst}>
          <ChevronsLeft className='size-4 text-tundora' />
        </Button>
        <Button variant='ghost' onClick={onPrevious} disabled={disablePrevious}>
          <ChevronLeft className='size-4 text-tundora' />
        </Button>
        <Button variant='ghost' onClick={onNext} disabled={disableNext}>
          <ChevronRight className='size-4 text-tundora' />
        </Button>
        <Button variant='ghost' onClick={onLast} disabled={disableLast}>
          <ChevronsRight className='size-4 text-tundora' />
        </Button>
      </div>
    </div>
  );
};
