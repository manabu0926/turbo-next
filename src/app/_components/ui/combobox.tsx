"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "@/app/_lib/utils";

export interface ComboboxOption {
  value: string | number;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | number;
  onSelect: (value: string | number) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Combobox({
  options,
  value,
  onSelect,
  placeholder = "選択してください...",
  searchPlaceholder = "検索...",
  emptyMessage = "該当する項目がありません",
  className,
  disabled = false,
  fullWidth = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex items-center justify-between gap-2 whitespace-nowrap rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50",
            "h-9",
            "data-[state=open]:border-ring data-[state=open]:ring-[1px] data-[state=open]:ring-ring/50",
            "dark:bg-input/30 dark:hover:bg-input/50",
            fullWidth ? "w-full" : "w-fit min-w-[200px]",
            !value && "text-muted-foreground",
            className,
          )}
          data-state={open ? "open" : "closed"}
          data-placeholder={!value ? "true" : undefined}
          disabled={disabled}
        >
          <span className="flex-1 truncate text-left">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        sideOffset={0}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  className="flex items-center justify-between"
                  onSelect={(currentValue) => {
                    const selected = options.find(
                      (opt) =>
                        opt.label.toLowerCase() === currentValue.toLowerCase(),
                    );
                    if (selected) {
                      onSelect(selected.value === value ? "" : selected.value);
                      setOpen(false);
                    }
                  }}
                >
                  {option.label}{" "}
                  <Check
                    className={cn(
                      "h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
