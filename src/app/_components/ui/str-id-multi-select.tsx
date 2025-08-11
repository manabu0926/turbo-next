"use client";

import { useState } from "react";
import { DismissibleBadge } from "@/app/_components/ui/badge";
import { cn } from "@/app/_lib/utils";

export type TIdName<T> = { id: T; name: string };

type MultiSelectProps<T> = {
  options: TIdName<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
  placeholder?: string;
  className?: string;
  fullWidth?: boolean;
};

export const StrIdMultiSelect = <T,>({
  options,
  selected,
  onChange,
  placeholder = "選択してください...",
  className,
  fullWidth = true,
}: MultiSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectedOptions = selected.flatMap((selectedId) =>
    options.filter((option) => option.id === selectedId),
  );

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (option: TIdName<T>) => {
    const isSelected = selected.some((item) => item === option.id);
    if (isSelected) {
      onChange(selected.filter((item) => item !== option.id));
    } else {
      onChange([...selected, option.id]);
    }
  };

  const handleRemove = (option: TIdName<T>) => {
    onChange(selected.filter((item) => item !== option.id));
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        fullWidth ? "w-full" : "inline-flex",
        className,
      )}
    >
      {/* 検索入力 */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className={cn(
            "flex h-9 rounded-lg border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
            fullWidth ? "w-full" : "w-64",
          )}
        />

        {/* ドロップダウンリスト */}
        {isOpen && (
          <div className="absolute top-full z-50 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-lg">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-muted-foreground text-sm">
                該当する項目がありません
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={`${option.id}`}
                  type="button"
                  className={cn(
                    "w-full px-3 py-2 text-left text-popover-foreground text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none dark:focus:bg-accent/50 dark:hover:bg-accent/50",
                    selected.some((item) => item === option.id) &&
                      "bg-primary/10 text-primary",
                  )}
                  onClick={() => handleSelect(option)}
                >
                  <span className="flex items-center justify-between">
                    {option.name}
                    {selected.some((item) => item === option.id) && (
                      <span className="text-primary">✓</span>
                    )}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* 選択済みのアイテム表示 */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((item) => (
            <DismissibleBadge
              key={`${item.id}`}
              variant="outline"
              color="primary"
              onDismiss={() => handleRemove(item)}
            >
              {item.name}
            </DismissibleBadge>
          ))}
        </div>
      )}
    </div>
  );
};
