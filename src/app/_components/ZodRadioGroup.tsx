"use client";

import type { ReactElement, ReactNode } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { FormWithLabel } from "./FormWithLabel";

export type RadioOption = {
  value: string;
  label: string | ReactNode;
};

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  options: RadioOption[];
  disabled?: boolean;
  className?: string;
  removeLabel?: boolean;
  orientation?: "horizontal" | "vertical";
};

export const ZodRadioGroup = <T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  options,
  disabled = false,
  className,
  removeLabel = false,
  orientation = "vertical",
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
        <RadioGroup
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
          className={className}
        >
          <div
            className={
              orientation === "horizontal"
                ? "flex flex-row gap-4"
                : "flex flex-col gap-3"
            }
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${name}-${option.value}`}
                />
                <Label
                  htmlFor={`${name}-${option.value}`}
                  className="cursor-pointer font-normal text-sm"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
