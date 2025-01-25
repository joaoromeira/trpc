import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';

interface CheckboxFieldProps {
  label: string;
  id?: string;
  error?: string;
  defaultChecked?: boolean;
  checked?: boolean | null;
  onChange?: (checked: boolean) => void;
}

export const CheckboxField = ({
  label,
  id,
  error,
  defaultChecked,
  checked,
  onChange,
}: CheckboxFieldProps) => {
  const handleChange = (value: CheckedState) => {
    if (onChange) onChange(value === 'indeterminate' ? false : value);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="flex items-center">
        <Checkbox
          id={id}
          defaultChecked={defaultChecked}
          checked={checked === null ? undefined : checked}
          onCheckedChange={handleChange}
        />
        <Label htmlFor={id} className="ml-2 cursor-pointer">
          {label}
        </Label>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
