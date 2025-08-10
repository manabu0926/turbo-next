"use client";

import type { ReactElement } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Checkbox } from "@/app/components/ui/checkbox";
import { FormWithLabel } from "./FormWithLabel";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  removeLabel?: boolean;
};

export const ZodCheckbox = <T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  disabled = false,
  className,
  removeLabel = false,
}: Props<T>): ReactElement => {
  // useControllerを使ってフォーム状態を管理
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormWithLabel label={label} required={required} removeLabel={removeLabel}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`${name}-${label}`}
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
            disabled={disabled}
            className={className}
          />
          {removeLabel && (
            <label
              htmlFor={`${name}-${label}`}
              className="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
