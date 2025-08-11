"use client";

import { Check, ChevronDown } from "lucide-react";
import * as React from "react";
import { DismissibleBadge } from "@/app/_components/ui/badge";
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

export interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: (string | number)[];
  onChange: (values: (string | number)[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function MultiSelectNew({
  options,
  selected,
  onChange,
  placeholder = "選択してください...",
  className,
  disabled = false,
  fullWidth = false,
  searchPlaceholder = "検索...",
  emptyMessage = "該当する項目がありません",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (label: string) => {
    const option = options.find(
      (opt) => opt.label.toLowerCase() === label.toLowerCase(),
    );
    if (option) {
      const newSelected = selected.includes(option.value)
        ? selected.filter((item) => item !== option.value)
        : [...selected, option.value];
      onChange(newSelected);
    }
  };

  const handleRemove = (value: string | number) => {
    onChange(selected.filter((item) => item !== value));
  };

  const selectedOptions = React.useMemo(
    () => options.filter((option) => selected.includes(option.value)),
    [options, selected],
  );

  return (
    <div className={cn("space-y-2", className)}>
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
              !selected.length && "text-muted-foreground",
            )}
            data-state={open ? "open" : "closed"}
            data-placeholder={!selected.length ? "true" : undefined}
            disabled={disabled}
          >
            <span className="flex-1 truncate text-left">
              {selected.length > 0 ? `${selected.length}件選択中` : placeholder}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
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
                    onSelect={handleSelect}
                    className="flex items-center justify-between"
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <DismissibleBadge
              key={option.value}
              variant="outline"
              color="primary"
              onDismiss={() => handleRemove(option.value)}
            >
              {option.label}
            </DismissibleBadge>
          ))}
        </div>
      )}
    </div>
  );
}
