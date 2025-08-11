"use client";

import type { ReactElement } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { MultiSelectNew, type Option } from "@/app/_components/ui/multi-select";
import { FormWithLabel } from "./FormWithLabel";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  removeLabel?: boolean;
  onChange?: (selected: (string | number)[]) => void;
};

export const ZodMultiSelect = <T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  options,
  placeholder = "選択してください",
  className,
  fullWidth = false,
  removeLabel = false,
  onChange,
}: Props<T>): ReactElement => {
  // useControllerを使ってフォーム状態を管理
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (selected: (string | number)[]) => {
    field.onChange(selected);
    onChange?.(selected);
  };

  return (
    <FormWithLabel label={label} required={required} removeLabel={removeLabel}>
      <div className="flex flex-col gap-1">
        <MultiSelectNew
          options={options}
          selected={field.value ?? []}
          onChange={handleChange}
          placeholder={placeholder}
          fullWidth={fullWidth}
          className={className}
          disabled={field.disabled}
        />
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
