"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export interface SimpleSelectOption<T extends string = string> {
  value: T;
  label: string;
}

type Props<T extends string = string> = {
  options: SimpleSelectOption<T>[];
  onValueChange: (value: T) => void;
  className?: string;
  fullWidth?: boolean;
  value?: T;
  placeholder?: string;
  defaultValue?: T;
};

export const SimpleSelect = <T extends string = string>({
  options,
  onValueChange,
  className,
  fullWidth = false,
  value,
  placeholder,
  defaultValue,
}: Props<T>) => {
  return (
    <Select
      value={value}
      onValueChange={(newValue) => onValueChange(newValue as T)}
      defaultValue={defaultValue}
    >
      <SelectTrigger
        className={`${fullWidth ? "w-full" : ""} ${className ?? ""}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
