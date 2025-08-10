"use client";

import type { ReactElement, ReactNode } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { FormWithLabel } from "./FormWithLabel";
import { SimpleTooltip } from "./SimpleTooltip";

export type SelectOption = {
  value: string | number;
  label: string | ReactNode;
  icon?: ReactNode;
  tooltipText?: string;
};

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string | number;
  removeLabel?: boolean;
  isNumber?: boolean;
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
};

export const ZodSelect = <T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  options,
  placeholder = "選択してください",
  removeLabel,
  isNumber = false,
  disabled = false,
  className,
  onValueChange,
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
        <Select
          value={field.value?.toString() ?? ""}
          onValueChange={(value: string) => {
            // カスタムコールバックがあれば実行
            onValueChange?.(value);
            if (isNumber) {
              field.onChange(Number(value));
            } else {
              field.onChange(value);
            }
          }}
          disabled={disabled}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => {
              const itemContent = (
                <div className="flex items-center gap-2">
                  {option.icon && <span>{option.icon}</span>}
                  <span>{option.label}</span>
                </div>
              );

              if (option.tooltipText) {
                return (
                  <SimpleTooltip
                    key={option.value}
                    renderContent={() => <p>{option.tooltipText}</p>}
                    side="left"
                  >
                    <SelectItem value={option.value.toString()}>
                      {itemContent}
                    </SelectItem>
                  </SimpleTooltip>
                );
              }

              return (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {itemContent}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
