import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@lib/utils';

interface DatePickerProps {
  label: string;
  id?: string;
  error?: string;
  value?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
}

export const DatePicker = ({
  error,
  id,
  label,
  onChange,
  value,
}: DatePickerProps) => {
  const handleSelectDate = (date: Date | undefined) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !value && 'text-muted-foreground'
            )}>
            {value ? (
              format(value, 'dd/MM/yyyy', {
                locale: ptBR,
              })
            ) : (
              <span>Selecione uma data</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            selected={value}
            onSelect={handleSelectDate}
            mode="single"
            locale={ptBR}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
