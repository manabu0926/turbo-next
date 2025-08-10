"use client";

import type { ReactElement } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Combobox, type ComboboxOption } from "@/app/components/ui/combobox";
import { FormWithLabel } from "./FormWithLabel";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  removeLabel?: boolean;
  onSearch?: (value: string) => void;
  onSelect?: (value: string | number) => void;
};

export const ZodCombobox = <T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  options,
  placeholder = "選択してください",
  searchPlaceholder = "検索...",
  emptyMessage = "該当する項目がありません",
  disabled = false,
  className,
  fullWidth = false,
  removeLabel = false,
  onSearch,
  onSelect,
}: Props<T>): ReactElement => {
  // useControllerを使ってフォーム状態を管理
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleSelect = (value: string | number) => {
    field.onChange(value);
    onSelect?.(value);
  };

  return (
    <FormWithLabel label={label} required={required} removeLabel={removeLabel}>
      <div className="flex flex-col gap-1">
        <Combobox
          options={options}
          value={field.value}
          onSelect={handleSelect}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          emptyMessage={emptyMessage}
          fullWidth={fullWidth}
          className={className}
          disabled={disabled || field.disabled}
        />
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
