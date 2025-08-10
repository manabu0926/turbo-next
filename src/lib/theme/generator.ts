/**
 * CSS変数を生成するユーティリティ
 */

import type { ColorScale, ThemeColors, ThemeConfig } from "./colors";

/**
 * カラー設定からCSS変数を生成
 */
function generateColorVariables(colors: ThemeColors): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === "string") {
      lines.push(`    --${key}: ${value};`);
    } else if (typeof value === "object" && value !== null) {
      const colorScale = value as ColorScale;
      lines.push(`    --${key}: ${colorScale.DEFAULT};`);
      lines.push(`    --${key}-foreground: ${colorScale.foreground};`);
    }
  }

  return lines.join("\n");
}

/**
 * テーマ設定からCSS文字列を生成
 */
export function generateThemeCSS(theme: ThemeConfig): string {
  const lightVars = generateColorVariables(theme.light);
  const darkVars = generateColorVariables(theme.dark);

  return `@layer base {
  :root {
${lightVars}
    --radius: ${theme.radius};
    --chart-1: ${theme.charts.chart1};
    --chart-2: ${theme.charts.chart2};
    --chart-3: ${theme.charts.chart3};
    --chart-4: ${theme.charts.chart4};
    --chart-5: ${theme.charts.chart5};
  }

  .dark {
${darkVars}
    --chart-1: ${theme.charts.chart1};
    --chart-2: ${theme.charts.chart2};
    --chart-3: ${theme.charts.chart3};
    --chart-4: ${theme.charts.chart4};
    --chart-5: ${theme.charts.chart5};
  }
}`;
}

/**
 * Tailwind CSS用の色設定を生成
 */
export function generateTailwindColors() {
  const colors = [
    "background",
    "foreground",
    "card",
    "card-foreground",
    "popover",
    "popover-foreground",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
    "success",
    "success-foreground",
    "warning",
    "warning-foreground",
    "error",
    "error-foreground",
    "info",
    "info-foreground",
    "border",
    "input",
    "ring",
  ];

  const tailwindColors: Record<string, string> = {};

  for (const color of colors) {
    tailwindColors[color] = `hsl(var(--${color}))`;
  }

  return tailwindColors;
}
