"use client";

import type { ReactElement } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Textarea } from "@/app/components/ui/textarea";
import { FormWithLabel } from "./FormWithLabel";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  minRows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  removeLabel?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const ZodTextArea = <T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  minRows = 4,
  maxLength,
  showCharCount = false,
  placeholder,
  disabled = false,
  className,
  removeLabel = false,
  onKeyDown,
}: Props<T>): ReactElement => {
  // useControllerを使ってフォーム状態を管理
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const currentLength = (field.value as string)?.length ?? 0;

  return (
    <FormWithLabel label={label} required={required} removeLabel={removeLabel}>
      <div className="flex flex-col gap-1">
        <Textarea
          {...field}
          placeholder={placeholder}
          disabled={disabled}
          className={`min-h-[${minRows * 24}px] ${className ?? ""}`}
          onKeyDown={onKeyDown}
        />
        {showCharCount && (
          <p
            className={`text-right text-xs ${
              maxLength && currentLength > maxLength
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {currentLength}
            {maxLength ? `/${maxLength}` : ""}文字
          </p>
        )}
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
