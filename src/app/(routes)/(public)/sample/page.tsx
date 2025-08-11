"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  AlertCircle,
  Check,
  Heart,
  Info,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { SimpleSelect } from "@/app/_components/SimpleSelect";
import { SimpleTextField } from "@/app/_components/SimpleTextField";
import { SimpleTooltip } from "@/app/_components/SimpleTooltip";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import type { ComboboxOption } from "@/app/_components/ui/combobox";
import { ZodCheckbox } from "@/app/_components/ZodCheckbox";
import { ZodCombobox } from "@/app/_components/ZodCombobox";
import { ZodDatePicker } from "@/app/_components/ZodDatePicker";
import { ZodMultiSelect } from "@/app/_components/ZodMultiSelect";
import { ZodRadioGroup } from "@/app/_components/ZodRadioGroup";
import { ZodSelect } from "@/app/_components/ZodSelect";
import { ZodSwitch } from "@/app/_components/ZodSwitch";
import { ZodTextArea } from "@/app/_components/ZodTextArea";
import { ZodTextField } from "@/app/_components/ZodTextField";

// サンプル用のZodスキーマ
const sampleSchema = z.object({
  textField: z.string().min(1, "必須項目です"),
  textArea: z.string().optional(),
  switch: z.boolean(),
  datePicker: z.date(),
  select: z.string(),
  radioGroup: z.string(),
  multiSelect: z.array(z.number()),
  checkbox: z.boolean(),
  combobox: z.string(),
});

type SampleFormData = z.infer<typeof sampleSchema>;

export default function ComponentSamplePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [_selectedCombobox, setSelectedCombobox] =
    useState<ComboboxOption | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // 初期状態でシステムの設定を確認
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const _toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const form = useForm<SampleFormData>({
    resolver: zodResolver(sampleSchema),
    defaultValues: {
      textField: "",
      textArea: "",
      switch: isDarkMode,
      datePicker: new Date(),
      select: "",
      radioGroup: "",
      multiSelect: [],
      checkbox: false,
      combobox: "",
    },
  });

  const selectOptions = [
    { value: "option1", label: "オプション1" },
    { value: "option2", label: "オプション2" },
    { value: "option3", label: "オプション3" },
  ];

  const radioOptions = [
    { value: "radio1", label: "ラジオ1" },
    { value: "radio2", label: "ラジオ2" },
    { value: "radio3", label: "ラジオ3" },
  ];

  const multiSelectOptions = [
    { value: 1, label: "マルチ1" },
    { value: 2, label: "マルチ2" },
    { value: 3, label: "マルチ3" },
    { value: 4, label: "マルチ4" },
  ];

  const comboboxOptions: ComboboxOption[] = [
    { value: "auto1", label: "オートコンプリート1" },
    { value: "auto2", label: "オートコンプリート2" },
    { value: "auto3", label: "オートコンプリート3" },
  ];

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-6xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-bold text-3xl">コンポーネントサンプル</h1>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <ZodSwitch
              control={form.control}
              name="switch"
              label="スイッチ"
              onChange={_toggleDarkMode}
              removeLabel
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* ボタンコンポーネント */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-2xl">Button</h2>
          <div className="space-y-4">
            {/* Default Variant */}
            <div>
              <h3 className="mb-2 font-medium text-lg">Default</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="solid" color="primary" size="sm">
                  Small
                </Button>
                <Button variant="solid" color="warning" size="default">
                  Default
                </Button>
                <Button variant="solid" color="destructive" size="lg">
                  Large
                </Button>
                <Button variant="solid" color="gray" size="lg">
                  Gray
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  size="icon"
                  tooltipText="お気に入り"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="solid" color="default" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Outline Variant */}
            <div>
              <h3 className="mb-2 font-medium text-lg">Outline</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" color="primary" size="sm">
                  Small
                </Button>
                <Button variant="outline" color="warning" size="default">
                  Default
                </Button>
                <Button variant="outline" color="destructive" size="lg">
                  Large
                </Button>
                <Button variant="outline" color="gray" size="lg">
                  Gray
                </Button>
                <Button
                  variant="outline"
                  color="primary"
                  size="icon"
                  tooltipText="検索"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" color="default" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Ghost Variant */}
            <div>
              <h3 className="mb-2 font-medium text-lg">Ghost</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="ghost" size="sm">
                  Small
                </Button>
                <Button variant="ghost" size="default">
                  Default
                </Button>
                <Button variant="ghost" size="lg">
                  Large
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Link Variant */}
            <div>
              <h3 className="mb-2 font-medium text-lg">Link</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="link" size="sm">
                  Small Link
                </Button>
                <Button variant="link" size="default">
                  Default Link
                </Button>
                <Button variant="link" size="lg">
                  Large Link
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Badge コンポーネント */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-2xl">Badge</h2>
          <div className="space-y-4">
            {/* Default Color */}
            <div>
              <h3 className="mb-2 font-medium text-lg">Default</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="solid" color="default">
                  Default
                </Badge>
                <Badge variant="solid" color="default">
                  <Info className="h-3 w-3" />
                  With Icon
                </Badge>
                <Badge variant="solid" color="default">
                  New
                </Badge>
                <Badge variant="solid" color="default">
                  Active
                </Badge>
              </div>
            </div>

            {/* Primary Color */}
            <div>
              <h3 className="mb-2 font-medium text-lg">Primary</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="solid" color="primary">
                  Primary
                </Badge>
                <Badge variant="solid" color="primary">
                  <Settings className="h-3 w-3" />
                  Settings
                </Badge>
                <Badge variant="solid" color="primary">
                  Draft
                </Badge>
                <Badge variant="solid" color="primary">
                  Pending
                </Badge>
              </div>
            </div>

            {/* Destructive Color */}
            <div>
              <h3 className="mb-2 font-medium text-lg">Destructive</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="solid" color="destructive">
                  Destructive
                </Badge>
                <Badge variant="solid" color="destructive">
                  <AlertCircle className="h-3 w-3" />
                  Error
                </Badge>
                <Badge variant="solid" color="destructive">
                  Expired
                </Badge>
                <Badge variant="solid" color="destructive">
                  Failed
                </Badge>
              </div>
            </div>

            {/* Outline Variant */}
            <div>
              <h3 className="mb-2 font-medium text-lg">Outline</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" color="default">
                  Outline
                </Badge>
                <Badge variant="outline" color="primary">
                  <Check className="h-3 w-3" />
                  Completed
                </Badge>
                <Badge variant="outline" color="warning">
                  Optional
                </Badge>
                <Badge variant="outline" color="gray">
                  Info
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* LoadingSpinner コンポーネント */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-2xl">LoadingSpinner</h2>
          <div className="flex items-center gap-4">
            <div>
              <p className="mb-2 text-gray-600 text-sm">Small</p>
              <LoadingSpinner size="sm" />
            </div>
            <div>
              <p className="mb-2 text-gray-600 text-sm">Medium (default)</p>
              <LoadingSpinner size="md" />
            </div>
            <div>
              <p className="mb-2 text-gray-600 text-sm">Large</p>
              <LoadingSpinner size="lg" />
            </div>
            <Button onClick={() => setIsLoading(!isLoading)}>
              {isLoading ? "Stop Loading" : "Start Loading"}
            </Button>
            {isLoading && <LoadingSpinner size="md" />}
          </div>
        </section>

        {/* SimpleTooltip コンポーネント */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-2xl">SimpleTooltip</h2>
          <div className="flex items-center gap-4">
            <SimpleTooltip
              renderContent={() => <span>これはツールチップです</span>}
            >
              <Button variant="outline">ホバーしてください</Button>
            </SimpleTooltip>

            <SimpleTooltip
              renderContent={() => (
                <span>
                  長いテキストも表示できます。ツールチップは自動的に適切な位置に表示されます。
                </span>
              )}
            >
              <span className="cursor-help text-blue-500 underline">
                長いツールチップ
              </span>
            </SimpleTooltip>
          </div>
        </section>

        {/* フォームコンポーネント */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-2xl">
            フォームコンポーネント
          </h2>
          <form className="max-w-2xl space-y-6">
            {/* ZodTextField */}
            <div>
              <h3 className="mb-2 font-medium text-lg">ZodTextField</h3>
              <ZodTextField
                control={form.control}
                name="textField"
                label="テキストフィールド"
                placeholder="テキストを入力してください"
              />
            </div>

            {/* ZodTextArea */}
            <div>
              <h3 className="mb-2 font-medium text-lg">ZodTextArea</h3>
              <ZodTextArea
                control={form.control}
                name="textArea"
                label="テキストエリア"
                placeholder="複数行のテキストを入力できます"
                minRows={4}
              />
            </div>
            <div>
              <h3 className="mb-2 font-medium text-lg">ZodDatePicker</h3>
              <ZodDatePicker
                control={form.control}
                name="datePicker"
                label="日付ピッカー"
                placeholder="日付を選択してください"
              />
            </div>

            {/* ZodSwitch */}
            <div>
              <h3 className="mb-2 font-medium text-lg">ZodSwitch</h3>
              <ZodSwitch
                control={form.control}
                name="switch"
                label="スイッチ"
                description="ON/OFFを切り替えます"
              />
            </div>

            {/* ZodSelect */}
            <div>
              <h3 className="mb-2 font-medium text-lg">ZodSelect</h3>
              <ZodSelect
                control={form.control}
                name="select"
                label="セレクト"
                placeholder="選択してください"
                options={selectOptions}
              />
            </div>

            {/* ZodRadioGroup */}
            <div>
              <h3 className="mb-2 font-medium text-lg">ZodRadioGroup</h3>
              <ZodRadioGroup
                control={form.control}
                name="radioGroup"
                label="ラジオグループ"
                options={radioOptions}
              />
            </div>

            {/* ZodMultiSelectNew */}
            <div>
              <h3 className="mb-2 font-medium text-lg">ZodMultiSelectNew</h3>
              <ZodMultiSelect
                control={form.control}
                name="multiSelect"
                label="マルチセレクト"
                placeholder="複数選択できます"
                options={multiSelectOptions}
              />
            </div>

            {/* ZodCheckbox */}
            <div>
              <h3 className="mb-2 font-medium text-lg">ZodCheckbox</h3>
              <ZodCheckbox
                control={form.control}
                name="checkbox"
                label="チェックボックス"
                removeLabel={true}
              />
            </div>

            {/* ZodCombobox */}
            <div>
              <h3 className="mb-2 font-medium text-lg">ZodCombobox</h3>
              <ZodCombobox
                control={form.control}
                name="combobox"
                label="オートコンプリート"
                placeholder="入力すると候補が表示されます"
                options={comboboxOptions}
                onSelect={(option) =>
                  setSelectedCombobox({ value: option, label: String(option) })
                }
              />
            </div>
          </form>
        </section>

        {/* FullWidth Props デモ */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-2xl">FullWidth Props Demo</h2>
          <div className="space-y-6">
            {/* Normal Width */}
            <div>
              <h3 className="mb-2 font-medium text-lg">
                通常幅 (fullWidth=false)
              </h3>
              <div className="space-y-4 rounded-lg border bg-gray-50 p-4 dark:bg-gray-900">
                <ZodTextField
                  control={form.control}
                  name="textField"
                  label="テキストフィールド (通常)"
                  placeholder="通常幅のテキストフィールド"
                />
                <ZodSelect
                  control={form.control}
                  name="select"
                  label="セレクト (通常)"
                  placeholder="通常幅のセレクト"
                  options={selectOptions}
                />
                <ZodTextArea
                  control={form.control}
                  name="textArea"
                  label="テキストエリア (通常)"
                  placeholder="通常幅のテキストエリア"
                />
                <ZodMultiSelect
                  control={form.control}
                  name="multiSelect"
                  label="マルチセレクト (通常)"
                  placeholder="通常幅のマルチセレクト"
                  options={multiSelectOptions}
                />
              </div>
            </div>

            {/* Full Width */}
            <div>
              <h3 className="mb-2 font-medium text-lg">
                全幅 (fullWidth=true)
              </h3>
              <div className="space-y-4 rounded-lg border bg-gray-50 p-4 dark:bg-gray-900">
                <ZodTextField
                  control={form.control}
                  name="textField"
                  label="テキストフィールド (全幅)"
                  placeholder="全幅のテキストフィールド"
                  fullWidth
                />
                <ZodSelect
                  control={form.control}
                  name="select"
                  label="セレクト (全幅)"
                  placeholder="全幅のセレクト"
                  options={selectOptions}
                  fullWidth
                />
                <ZodTextArea
                  control={form.control}
                  name="textArea"
                  label="テキストエリア (全幅)"
                  placeholder="全幅のテキストエリア"
                  fullWidth
                />
                <ZodMultiSelect
                  control={form.control}
                  name="multiSelect"
                  label="マルチセレクト (全幅)"
                  placeholder="全幅のマルチセレクト"
                  options={multiSelectOptions}
                  fullWidth
                />
                <ZodCombobox
                  control={form.control}
                  name="combobox"
                  label="オートコンプリート (全幅)"
                  placeholder="全幅のオートコンプリート"
                  options={comboboxOptions}
                  onSelect={(option) =>
                    setSelectedCombobox({
                      value: option,
                      label: String(option),
                    })
                  }
                  fullWidth
                />
              </div>
            </div>

            {/* SimpleTextField and SimpleSelect Demo */}
            <div>
              <h3 className="mb-2 font-medium text-lg">Simple Components</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 rounded-lg border bg-gray-50 p-4 dark:bg-gray-900">
                  <h4 className="font-medium text-sm">通常幅</h4>
                  <SimpleTextField
                    label="SimpleTextField"
                    placeholder="通常幅"
                    value=""
                    onChange={(value: string | number) => console.log(value)}
                  />
                  <SimpleSelect
                    options={[
                      { value: "option1", label: "オプション1" },
                      { value: "option2", label: "オプション2" },
                      { value: "option3", label: "オプション3" },
                    ]}
                    onValueChange={(value: string) => console.log(value)}
                    placeholder="通常幅のセレクト"
                  />
                </div>
                <div className="space-y-4 rounded-lg border bg-gray-50 p-4 dark:bg-gray-900">
                  <h4 className="font-medium text-sm">全幅</h4>
                  <SimpleTextField
                    label="SimpleTextField"
                    placeholder="全幅"
                    value=""
                    onChange={(value: string | number) => console.log(value)}
                    fullWidth
                  />
                  <SimpleSelect
                    options={[
                      { value: "option1", label: "オプション1" },
                      { value: "option2", label: "オプション2" },
                      { value: "option3", label: "オプション3" },
                    ]}
                    onValueChange={(value: string) => console.log(value)}
                    placeholder="全幅のセレクト"
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
