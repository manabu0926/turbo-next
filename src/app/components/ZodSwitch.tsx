"use client";

import type { ReactElement } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { FormWithLabel } from "./FormWithLabel";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  removeLabel?: boolean;
  disabled?: boolean;
  className?: string;
  description?: string;
  onChange?: (checked: boolean) => void;
};

export const ZodSwitch = <T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  removeLabel,
  disabled = false,
  className,
  description,
  onChange,
}: Props<T>): ReactElement => {
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
        <div className={`flex items-center gap-2 ${className ?? ""}`}>
          <Switch
            id={name}
            checked={field.value ?? false}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              onChange?.(checked);
            }}
            disabled={disabled}
          />
          {description && (
            <Label
              htmlFor={name}
              className="flex-shrink-0 cursor-pointer text-sm"
            >
              {description}
            </Label>
          )}
        </div>
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
