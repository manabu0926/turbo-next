"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";
import { type ReactElement, useState } from "react";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "@/app/_lib/utils";
import { FormWithLabel } from "./FormWithLabel";
import { SimpleTooltip } from "./SimpleTooltip";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  removeLabel?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  calendarClassName?: string;
  disabledDates?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (date: Date | undefined) => void;
  orientation?: "horizontal" | "vertical";
  initialMonth?: Date;
  showClearButton?: boolean;
  fullWidth?: boolean;
};

export const ZodDatePicker = <T extends FieldValues>({
  label,
  name,
  control,
  required = false,
  removeLabel,
  placeholder = "日付を選択",
  disabled = false,
  className,
  buttonClassName,
  calendarClassName,
  disabledDates,
  minDate,
  maxDate,
  onChange,
  orientation = "vertical",
  initialMonth,
  showClearButton = false,
  fullWidth = false,
}: Props<T>): ReactElement => {
  // Popoverの開閉状態を管理
  const [open, setOpen] = useState(false);

  // useControllerを使ってフォーム状態を管理
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleDisabledDates = (date: Date) => {
    if (disabledDates) {
      return disabledDates(date);
    }
    if (minDate && date < minDate) {
      return true;
    }
    if (maxDate && date > maxDate) {
      return true;
    }
    return false;
  };

  const handleSelect = (date: Date | undefined) => {
    field.onChange(date ? format(date, "yyyy-MM-dd") : null);
    onChange?.(date);
    // 日付が選択されたらPopoverを閉じる
    if (date) {
      setOpen(false);
    }
  };

  const handleClear = () => {
    field.onChange(null);
    onChange?.(undefined);
  };

  return (
    <FormWithLabel
      label={label}
      required={required}
      removeLabel={removeLabel}
      orientation={orientation}
    >
      <div className="flex flex-col gap-1">
        <div className={cn("flex gap-1", className)}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal hover:bg-transparent",
                  fullWidth && "flex-1",
                  !field.value && "text-muted-foreground",
                  buttonClassName,
                )}
                disabled={disabled}
              >
                {field.value ? (
                  format(field.value, "yyyy年MM月dd日", { locale: ja })
                ) : (
                  <span>{placeholder}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                defaultMonth={
                  field.value ? new Date(field.value) : initialMonth
                }
                onSelect={handleSelect}
                disabled={handleDisabledDates}
                autoFocus
                locale={ja}
                showOutsideDays={false}
                className={calendarClassName}
              />
            </PopoverContent>
          </Popover>
          {showClearButton && field.value && (
            <SimpleTooltip
              renderContent={() => <span>日付をクリア</span>}
              side="top"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClear}
                disabled={disabled}
                className="h-9 w-9"
              >
                <X className="h-4 w-4" />
              </Button>
            </SimpleTooltip>
          )}
        </div>
        {error && <p className="text-red-600 text-sm">{error.message}</p>}
      </div>
    </FormWithLabel>
  );
};
