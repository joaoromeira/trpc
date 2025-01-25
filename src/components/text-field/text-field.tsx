import { ChangeEvent, InputHTMLAttributes } from 'react';

import { IMagicMasksNames } from 'magic-masks';
import * as masks from 'magic-masks';

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: string;
  mask?: IMagicMasksNames;
  helperText?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    unmaskedValue?: string
  ) => void;
}

export const TextField = ({
  error,
  id,
  label,
  onChange,
  mask,
  helperText,
  ...inputProps
}: TextFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!onChange) return;

    if (!mask) {
      onChange(event);
      return;
    }

    event.target.value = masks[mask](value);
    onChange(event, value);
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} onChange={handleChange} />
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
