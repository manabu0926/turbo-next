"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/lib/utils";

export type TIdName<T> = { id: T; name: string };

type MultiSelectProps<T> = {
  options: TIdName<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
  placeholder?: string;
  className?: string;
};

export const StrIdMultiSelect = <T,>({
  options,
  selected,
  onChange,
  placeholder = "選択してください...",
  className,
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
    <div className={cn("relative flex flex-col gap-2", className)}>
      {/* 検索入力 */}
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
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
                    "w-full px-3 py-2 text-left text-popover-foreground text-sm hover:bg-blue-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
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
          {selectedOptions.map((item) => {
            return (
              <span
                key={`${item.id}`}
                className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs dark:bg-blue-900/50 dark:text-blue-200"
              >
                {item.name}
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  className="rounded hover:bg-blue-200 dark:hover:bg-blue-800/50"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
