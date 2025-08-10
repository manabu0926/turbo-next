"use client";

import type { ReactElement } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { MultiSelect } from "@/app/components/ui/multi-select";
import {
  StrIdMultiSelect,
  type TIdName,
} from "@/app/components/ui/str-id-multi-select";
import type { IdName } from "@/app/generated/query/api.schemas";
import { FormWithLabel } from "./FormWithLabel";

type Props<T extends FieldValues, TId = number | string> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  options: IdName[] | TIdName<TId>[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  removeLabel?: boolean;
  onChange?: (selected: number[]) => void;
  onChangeT?: (selected: TId[]) => void;
};

export const ZodMultiSelect = <T extends FieldValues, TId = number | string>({
  label,
  name,
  control,
  required = false,
  options,
  placeholder = "選択してください",
  className,
  removeLabel = false,
  onChange,
  onChangeT,
}: Props<T, TId>): ReactElement => {
  // useControllerを使ってフォーム状態を管理
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const isNumberId = (
    options: IdName[] | TIdName<TId>[],
  ): options is IdName[] => {
    return options.every((option) => typeof option.id === "number");
  };

  const handleChange = (selected: number[]) => {
    field.onChange(selected);
    onChange?.(selected);
  };

  const handleStrIdChange = (selected: TId[]) => {
    field.onChange(selected);
    onChangeT?.(selected);
  };

  return (
    <FormWithLabel label={label} required={required} removeLabel={removeLabel}>
      <div className="flex flex-col gap-1">
        {isNumberId(options) ? (
          <MultiSelect
            options={options}
            selected={field.value ?? []}
            onChange={handleChange}
            placeholder={placeholder}
            className={className}
          />
        ) : (
          <StrIdMultiSelect
            options={options as TIdName<TId>[]}
            selected={field.value ?? []}
            onChange={handleStrIdChange}
            placeholder={placeholder}
            className={className}
          />
        )}
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
