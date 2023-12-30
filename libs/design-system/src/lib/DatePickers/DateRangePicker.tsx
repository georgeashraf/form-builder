import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';
import { cn } from '../utils/helpers';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../Calendar';
import { DateRange } from 'react-day-picker';

export function DateRangePicker({
  className,
  value,
  onChange,
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value?: { from: string; to: string };
  onChange?: (d?: DateRange) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal hover:bg-secondary',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              value?.from && value.to ? (
                <>
                  {format(value.from, 'LLL dd, y')} -{' '}
                  {format(value.to, 'LLL dd, y')}
                </>
              ) : (
                value?.from && format(value.from, 'LLL dd, y')
              )
            ) : date?.from && date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} -{' '}
                {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              date?.from && format(date.from, 'LLL dd, y')
            )}
            {!date && !value && <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value ? new Date(value.from) : date?.from}
            selected={
              value
                ? { from: new Date(value.from), to: new Date(value.to) }
                : date
            }
            onSelect={onChange ?? setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
