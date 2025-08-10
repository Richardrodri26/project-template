import { useDebouncedValue } from "@/hooks/useDebounce";
import { useShallowEffect } from "@/hooks/useShallowEffect";
import type { TC } from "@/interfaces/ReactComps";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Input } from "./ui/input";

/*-------- config --------*/

type PropsSearchComponent = {
  placeholder?: string;
  wait?: number;
  callBack: (value?: string | number) => void;
  defaultValue?: string | number;
  className?: string;
  containerClass?: string;
  iconLeft?: ReactNode; // ícono izquierdo opcional
  inputType?: React.HTMLInputTypeAttribute;
  step?: string | number | undefined;
  min?: string | number | undefined;
};

/*-------- components --------*/

export const SearchWithDebounce: TC<PropsSearchComponent> = ({ placeholder = 'Buscar...', callBack, wait = 1000, defaultValue = '', containerClass, className, iconLeft, inputType, step, min }) => {
  const [search, setSearch] = useState<string | number>(defaultValue);
  const { _value, loading } = useDebouncedValue({ value: search, wait, options: { leading: false } });

  useShallowEffect(() => {
    _value && callBack(_value);
  }, [_value]);

  const cancelSearch = () => {
    setSearch('');
    callBack(undefined);
  };

  return (
    <div className={cn('flex items-center gap-2.5 rounded-lg border border-input px-3 py-1.5', containerClass)}>
      {iconLeft && <div className='size-4 max-w-4 text-muted-foreground'>{iconLeft}</div>}

      <Input
        type={inputType}
        step={step}
        min={min}
        name='Search'
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholder}
        className={cn('h-6 flex-1 border-none py-0 pl-0 focus-visible:ring-0 focus-visible:ring-offset-0', className)}
      />

      {search && !loading && (
        <button type='button' onClick={cancelSearch} className='text-muted-foreground hover:text-foreground'>
          <X size={16} />
        </button>
      )}


    </div>
  );
};

