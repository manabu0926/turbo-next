"use client";

import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Input } from "@/app/components/ui/input";
import type { TIdName } from "@/app/components/ui/str-id-multi-select";
import { cn } from "@/app/lib/utils";
import { FormWithLabel } from "./FormWithLabel";

type Props<T extends FieldValues, TId = number | string> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  options: TIdName<TId>[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  removeLabel?: boolean;
  onSearch: (value: string) => void;
  onSelect: (value: TIdName<TId>) => void;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
};

export const ZodAutoComplete = <T extends FieldValues, TId = number | string>({
  label,
  name,
  control,
  required = false,
  options,
  placeholder = "選択してください...",
  disabled = false,
  className,
  removeLabel = false,
  onSearch,
  onSelect,
  onChange,
  isDisabled = false,
}: Props<T, TId>): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // 日本語入力中かどうかを管理するフラグ
  const [isComposing, setIsComposing] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom",
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // useControllerを使ってフォーム状態を管理
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const handleSelect = (option: TIdName<TId>) => {
    onSelect(option);
    field.onChange(option.id);
    setInputValue(option.name);
    setIsOpen(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onChange?.(value);
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      onSearch(value);
    }, 300);

    setTimer(newTimer);
    setIsOpen(true);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const calculateDropdownPosition = () => {
      if (!inputRef.current) return;

      const inputRect = inputRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const dropdownHeight = 240; // max-h-60 = 15rem = 240px
      const spaceBelow = windowHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      // 下側に十分なスペースがない場合は上に表示
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    };

    calculateDropdownPosition();
  }, []);

  useEffect(() => {
    setInputValue(field.value);
    if (!field.value) {
      setIsOpen(false);
    }
  }, [field.value]);

  return (
    <FormWithLabel label={label} required={required} removeLabel={removeLabel}>
      <div className="flex flex-col gap-1">
        <div className={cn("relative", className)}>
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onInput={(e) => {
              setInputValue(e.currentTarget.value);
              if (isComposing) {
                return;
              }
              onChange?.(e.currentTarget.value);
              handleInputChange(e.currentTarget.value);
            }}
            onFocus={handleFocus}
            disabled={disabled}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={(e) => {
              setIsComposing(false);
              handleInputChange(e.currentTarget.value);
            }}
          />
          {/* ドロップダウンリスト */}
          {isOpen && !disabled && (
            <div
              ref={dropdownRef}
              className={cn(
                "absolute z-50 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-lg",
                dropdownPosition === "bottom"
                  ? "top-full mt-1"
                  : "bottom-full mb-1",
              )}
            >
              {options.length === 0 ? (
                <div className="px-3 py-2 text-muted-foreground text-sm">
                  該当する項目がありません
                </div>
              ) : (
                options.map((option) => (
                  <button
                    key={`${option.id}`}
                    type="button"
                    className={cn(
                      "w-full px-3 py-2 text-left text-popover-foreground text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:bg-gray-100 disabled:text-gray-500",
                      field.value === option.id && "bg-primary/10 text-primary",
                    )}
                    onClick={() => handleSelect(option)}
                    disabled={isDisabled}
                  >
                    {option.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
