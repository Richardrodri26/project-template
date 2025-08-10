import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarDays, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import * as React from 'react';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

import { es } from 'date-fns/locale';
import { DayButton, DayPicker, type DropdownProps, getDefaultClassNames } from 'react-day-picker';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: CalendarProps & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      locale={es}
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: date => date.toLocaleString('default', { month: 'long' }).replace(/^\w/, c => c.toUpperCase()),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn('absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1', defaultClassNames.nav),
        button_previous: cn(buttonVariants({ variant: buttonVariant }), 'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50', defaultClassNames.button_previous),
        button_next: cn(buttonVariants({ variant: buttonVariant }), 'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50', defaultClassNames.button_next),
        month_caption: cn('flex h-[--cell-size] w-full items-center justify-center', props.hideNavigation ? 'px-0' : 'px-[--cell-size]', defaultClassNames.month_caption),
        dropdowns: cn('flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium [&>*]:flex-1 [&>*]:text-center', defaultClassNames.dropdowns),
        dropdown_root: cn('has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border w-full', defaultClassNames.dropdown_root),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label' ? 'text-sm' : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5 justify-between',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex justify-between', defaultClassNames.weekdays),
        weekday: cn('text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal max-w-[32px]', defaultClassNames.weekday),
        week: cn('mt-2 flex w-full justify-between', defaultClassNames.week),
        week_number_header: cn('w-[--cell-size] select-none', defaultClassNames.week_number_header),
        week_number: cn('text-muted-foreground select-none text-[0.8rem]', defaultClassNames.week_number),
        day: cn('group/day relative aspect-square h-fit w-fit select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md', defaultClassNames.day),
        range_start: cn('bg-accent rounded-l-md', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('bg-accent rounded-r-md', defaultClassNames.range_end),
        today: cn('bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none', defaultClassNames.today),
        outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaultClassNames.outside),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot='calendar' ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-4', className)} {...props} />;
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-4', className)} {...props} />;
          }

          return <ChevronDownIcon className={cn('size-4', className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className='flex size-[--cell-size] items-center justify-center text-center'>{children}</div>
            </td>
          );
        },

        Dropdown: CustomSelectDropdown,

        ...components,
      }}
      modifiers={{
        isWeekend: date => {
          const day = date.getDay();
          return day === 0 || day === 6;
        },
        ...props.modifiers,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant='ghost'
      size='icon'
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        '!px-[8.5px] !py-[7px] flex aspect-square h-auto w-fit min-w-[--cell-size] flex-col gap-1 rounded-lg font-normal text-sm text-tundora leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-end=true]:bg-blue data-[range-middle=true]:bg-accent data-[range-start=true]:bg-blue data-[selected-single=true]:bg-blue data-[range-end=true]:text-primary-foreground data-[range-middle=true]:text-accent-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

interface DateTimePickerProps {
  value?: Date;
  time?: string;
  showDate?: boolean;
  showTime?: boolean;
  onDateChange?: (date: Date | undefined) => void;
  onTimeChange?: (time: string) => void;
  disabled?: boolean;
  timeDisabled?: boolean;
  className?: string;
  label?: string;
  popoverAlign?: 'center' | 'end' | 'start' | undefined;
  buttonClassName?: string;
  captionLayout?: 'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years' | undefined;
  hasError?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  time,
  timeDisabled = false,
  buttonClassName,
  showDate = true,
  showTime = false,
  onDateChange,
  onTimeChange,
  disabled = false,
  className = '',
  label,
  popoverAlign = 'start',
  captionLayout = 'dropdown',
  hasError = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();

  const modifiers = {
    weekend: (date: Date) => {
      const day = date.getDay(); // 0 = Sunday, 6 = Saturday
      return day === 0 || day === 6;
    },
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {showDate && (
        <div className='flex w-full flex-col gap-1.5'>
          {label ? (
            <Label htmlFor={id} className={cn(' block font-inter font-medium text-base text-tundora', disabled && 'text-opacity-70')}>
              {label}
            </Label>
          ) : null}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                id={id}
                className={cn(
                  '!text-tundora hover:!border-navy justify-between bg-white-light font-normal text-sm disabled:cursor-not-allowed disabled:border-tundora-light-active disabled:bg-gray-concrete disabled:text-white-dark-active disabled:opacity-70',
                  disabled && 'placeholder:text-tundora-light-active',
                  hasError ? 'border-red-normal-hover text-red ring-1 ring-red-normal-hover' : 'border-gray-300',
                  hasError ? 'focus:border-red-normal-hover focus:ring-2 focus:ring-red-normal-hover' : 'focus:border-green-normal focus:ring-2 focus:ring-green-normal',
                  buttonClassName,
                )}
                disabled={disabled}
              >
                {value ? value.toLocaleDateString() : 'Seleccionar fecha'}
                <CalendarDays />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto min-w-[301px] overflow-hidden rounded-lg p-4' align={popoverAlign}>
              <Calendar
                hideNavigation
                className='w-full bg-transparent p-0'
                mode='single'
                selected={value}
                captionLayout={captionLayout}
                onSelect={date => {
                  onDateChange?.(date);
                  setOpen(false);
                }}
                modifiers={modifiers}
                modifiersClassNames={{
                  weekend: '[&>button]:text-blue [&>button]:bg-transparent',
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
      {showTime && (
        <div className='flex flex-col '>
          <Label htmlFor={id} className={cn('block font-inter font-medium text-base text-tundora', disabled && 'text-opacity-70')}>
            Hora
          </Label>
          <div className='relative my-[6px]'>
            <Input
              step='60'
              type='time'
              id='time-picker'
              value={time}
              disabled={disabled || timeDisabled}
              onChange={e => onTimeChange?.(e.target.value)}
              className={cn(
                'peer min-h-10 rounded-lg border border-navy-light-active bg-white p-2 font-normal text-base text-tundora placeholder:text-white-normal-active focus:outline-none focus-visible:ring-transparent disabled:cursor-not-allowed disabled:border-tundora-light-active disabled:bg-gray-concrete disabled:text-white-dark-active dark:bg-white-light', // Estilos base
                disabled && 'placeholder:text-tundora-light-active',
                hasError ? 'border-red-normal-hover text-red ring-1 ring-red-normal-hover' : 'border-gray-300',
                hasError ? 'focus:border-red-normal-hover focus:ring-2 focus:ring-red-normal-hover' : 'focus:border-green-normal focus:ring-2 focus:ring-green-normal',
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function CustomSelectDropdown(props: DropdownProps) {
  const { options, value, onChange } = props;

  const handleValueChange = (newValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: newValue,
        },
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }
  };

  return (
    <Select value={value?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className='max-h-[300px] p-2.5'>
        <SelectGroup>
          {options?.map(option => (
            <SelectItem className='cursor-pointer rounded-lg px-2 py-2.5 hover:bg-navy-light-hover' key={option.value} value={option.value.toString()} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { Calendar, CalendarDayButton, DateTimePicker };
