import * as React from 'react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';
import { cn } from '../utils/helpers';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../Calendar';

export function DatePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (d?: Date) => void;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            ' justify-start text-left font-normal hover:bg-secondary',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value && format(value, 'PPP')}
          {date && format(date, 'PPP')}
          {!date && !value && <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : date}
          onSelect={onChange ?? setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
