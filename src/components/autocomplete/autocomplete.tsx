'use client';

import { useMemo, useState } from 'react';

import { Command as CommandPrimitive } from 'cmdk';
import { Check } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Popover, PopoverAnchor, PopoverContent } from '@components/ui/popover';
import { Skeleton } from '@components/ui/skeleton';
import { cn } from '@lib/utils';

type AutocompleteProps<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  label: string;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  options: { value: T; label: string }[];
  isLoading?: boolean;
  emptyMessage?: string;
  error?: string;
  placeholder?: string;
};

export const Autocomplete = <T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  label,
  onSearchValueChange,
  options,
  error,
  isLoading,
  emptyMessage = 'Nenhum resultado.',
  placeholder = 'Buscar...',
}: AutocompleteProps<T>) => {
  const [open, setOpen] = useState(false);

  const labels = useMemo(
    () =>
      options.reduce(
        (acc, option) => {
          acc[option.value] = option.label;
          return acc;
        },
        {} as Record<string, string>
      ),
    [options]
  );

  const reset = () => {
    onSelectedValueChange('' as T);
    onSearchValueChange('');
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget?.hasAttribute('cmdk-list') &&
      labels[selectedValue] !== searchValue
    ) {
      reset();
    }
  };

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset();
    } else {
      onSelectedValueChange(inputValue as T);
      onSearchValueChange(labels[inputValue] ?? '');
    }
    setOpen(false);
  };

  return (
    <div className="w-full">
      <Label>{label}</Label>
      <div className="mb-1.5 flex items-center">
        <Popover open={open} onOpenChange={setOpen}>
          <Command shouldFilter={false}>
            <PopoverAnchor asChild>
              <CommandPrimitive.Input
                asChild
                value={searchValue}
                onValueChange={onSearchValueChange}
                onKeyDown={e => setOpen(e.key !== 'Escape')}
                onMouseDown={() => setOpen(open => !!searchValue || !open)}
                onFocus={() => setOpen(true)}
                onBlur={onInputBlur}>
                <Input placeholder={placeholder} />
              </CommandPrimitive.Input>
            </PopoverAnchor>
            {!open && <CommandList aria-hidden="true" className="hidden" />}
            <PopoverContent
              asChild
              onOpenAutoFocus={e => e.preventDefault()}
              onInteractOutside={e => {
                if (
                  e.target instanceof Element &&
                  e.target.hasAttribute('cmdk-input')
                ) {
                  e.preventDefault();
                }
              }}
              className="w-[--radix-popover-trigger-width] p-0">
              <CommandList>
                {isLoading && (
                  <CommandPrimitive.Loading>
                    <div className="p-1">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  </CommandPrimitive.Loading>
                )}
                {options.length > 0 && !isLoading ? (
                  <CommandGroup>
                    {options.map(option => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onMouseDown={e => e.preventDefault()}
                        onSelect={onSelectItem}>
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedValue === option.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
                {!isLoading ? (
                  <CommandEmpty>
                    {emptyMessage ?? 'Nenhum resultado'}
                  </CommandEmpty>
                ) : null}
              </CommandList>
            </PopoverContent>
          </Command>
        </Popover>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
