"use client";

import { Eye, EyeOff } from "lucide-react";
import { type ReactElement, type ReactNode, useEffect, useState } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Input } from "@/app/components/ui/input";
import { FormWithLabel } from "./FormWithLabel";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  isNumber?: boolean;
  removeLabel?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  showPasswordToggle?: boolean;
  autoComplete?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  endIconOnClick?: () => void;
  endIconDisabled?: boolean;
  onChange?: (value: string | number) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const ZodTextField = <T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  isNumber = false,
  removeLabel,
  placeholder,
  type = "text",
  disabled = false,
  className,
  showPasswordToggle = false,
  autoComplete,
  startIcon,
  endIcon,
  endIconOnClick,
  endIconDisabled = false,
  onChange,
  onKeyDown,
}: Props<T>): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const [_isComposing, _setIsComposing] = useState(false);

  // useControllerを使ってフォーム状態を管理
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // 入力中の値を管理する内部state
  const [_inputValue, _setInputValue] = useState(field.value || "");

  // field.valueが変更されたときに内部stateも同期
  useEffect(() => {
    _setInputValue(field.value || "");
  }, [field.value]);

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  const hasRightIcon = showPasswordToggle || endIcon;
  const hasLeftIcon = !!startIcon;

  return (
    <FormWithLabel label={label} required={required} removeLabel={removeLabel}>
      <div className="flex flex-col gap-1">
        <div className="relative">
          {startIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {startIcon}
            </div>
          )}
          <Input
            {...field}
            value={_inputValue}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            className={`${hasLeftIcon ? "pl-10" : ""} ${hasRightIcon ? "pr-10" : ""} ${className ?? ""}`}
            onChange={(e) => {
              const newValue = e.target.value;
              _setInputValue(newValue); // 常に内部stateを更新（画面表示）

              if (_isComposing) {
                // 日本語入力中はfield.onChangeを呼ばない
                return;
              }

              if (isNumber) {
                const numericValue = newValue.replace(/[^0-9]/g, "");
                const numberValue = Number(numericValue) ?? 0;
                field.onChange(numberValue);
                onChange?.(numberValue);
              } else {
                field.onChange(newValue);
                onChange?.(newValue);
              }
            }}
            onKeyDown={onKeyDown}
            onCompositionStart={() => _setIsComposing(true)}
            onCompositionEnd={(e) => {
              _setIsComposing(false);
              const finalValue = e.currentTarget.value;

              if (isNumber) {
                const numericValue = finalValue.replace(/[^0-9]/g, "");
                const numberValue = Number(numericValue) ?? 0;
                field.onChange(numberValue);
                onChange?.(numberValue);
              } else {
                field.onChange(finalValue);
                onChange?.(finalValue);
              }
            }}
          />
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
          {!showPasswordToggle && endIcon && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={endIconOnClick}
              disabled={endIconDisabled}
            >
              {endIcon}
            </button>
          )}
        </div>
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
