import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

interface SelectFieldProps {
  label: string;
  id?: string;
  error?: string;
  value?: string | null;
  disabled?: boolean;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

export const SelectField = ({
  error,
  id,
  label,
  value,
  disabled,
  options,
  onChange,
}: SelectFieldProps) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select
        onValueChange={onChange}
        value={value === null ? undefined : value}
        disabled={disabled}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
