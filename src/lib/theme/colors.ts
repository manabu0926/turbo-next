/**
 * テーマカラー定義
 * HSL形式で管理し、ライト/ダークモード両方に対応
 */

export type ColorScale = {
  DEFAULT: string;
  foreground: string;
};

export type ThemeColors = {
  background: ColorScale;
  foreground: string;
  card: ColorScale;
  popover: ColorScale;
  primary: ColorScale;
  secondary: ColorScale;
  muted: ColorScale;
  accent: ColorScale;
  destructive: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  border: string;
  input: string;
  ring: string;
};

export type ThemeConfig = {
  light: ThemeColors;
  dark: ThemeColors;
  radius: string;
  charts: {
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
  };
};

// ブルーテーマ設定 (#0284c7 ベース)
export const blueTheme: ThemeConfig = {
  light: {
    background: {
      DEFAULT: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
    },
    foreground: "222.2 84% 4.9%",
    card: {
      DEFAULT: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
    },
    popover: {
      DEFAULT: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
    },
    primary: {
      DEFAULT: "199 89% 48%", // #0284c7
      foreground: "0 0% 100%",
    },
    secondary: {
      DEFAULT: "199 89% 92%", // プライマリの薄い色
      foreground: "199 89% 25%",
    },
    muted: {
      DEFAULT: "210 40% 96.1%",
      foreground: "215.4 16.3% 46.9%",
    },
    accent: {
      DEFAULT: "199 89% 92%",
      foreground: "199 89% 25%",
    },
    destructive: {
      DEFAULT: "0 84.2% 60.2%",
      foreground: "210 40% 98%",
    },
    success: {
      DEFAULT: "158 84% 39%", // #10b981
      foreground: "0 0% 100%",
    },
    warning: {
      DEFAULT: "38 92% 50%", // #f59e0b
      foreground: "0 0% 100%",
    },
    error: {
      DEFAULT: "0 84% 60%", // #ef4444
      foreground: "0 0% 100%",
    },
    info: {
      DEFAULT: "199 89% 48%", // #0284c7 (プライマリと同じ)
      foreground: "0 0% 100%",
    },
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    ring: "199 89% 48%",
  },
  dark: {
    background: {
      DEFAULT: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
    },
    foreground: "210 40% 98%",
    card: {
      DEFAULT: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
    },
    popover: {
      DEFAULT: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
    },
    primary: {
      DEFAULT: "199 89% 58%", // 明度を上げて調整
      foreground: "222.2 84% 4.9%",
    },
    secondary: {
      DEFAULT: "199 30% 17%", // プライマリの暗い色
      foreground: "210 40% 98%",
    },
    muted: {
      DEFAULT: "217.2 32.6% 17.5%",
      foreground: "215 20.2% 65.1%",
    },
    accent: {
      DEFAULT: "199 30% 25%",
      foreground: "210 40% 98%",
    },
    destructive: {
      DEFAULT: "0 62.8% 30.6%",
      foreground: "210 40% 98%",
    },
    success: {
      DEFAULT: "158 74% 49%", // 明度を上げて調整
      foreground: "0 0% 0%",
    },
    warning: {
      DEFAULT: "38 92% 60%", // 明度を上げて調整
      foreground: "0 0% 0%",
    },
    error: {
      DEFAULT: "0 74% 65%", // 明度を上げて調整
      foreground: "0 0% 100%",
    },
    info: {
      DEFAULT: "199 89% 58%", // プライマリと同じ
      foreground: "222.2 84% 4.9%",
    },
    border: "217.2 32.6% 17.5%",
    input: "217.2 32.6% 17.5%",
    ring: "199 89% 58%",
  },
  radius: "0.5rem",
  charts: {
    chart1: "199 89% 48%", // プライマリブルー
    chart2: "158 84% 39%", // 成功グリーン
    chart3: "38 92% 50%", // 警告オレンジ
    chart4: "0 84% 60%", // エラーレッド
    chart5: "270 60% 60%", // パープル
  },
};

// デフォルトテーマ設定（blueThemeをデフォルトとして使用）
export const defaultTheme = blueTheme;

// プリセットテーマ
export const themes = {
  default: blueTheme,
  blue: blueTheme,
  // 他のテーマプリセットを追加可能
  ocean: {
    ...defaultTheme,
    light: {
      ...defaultTheme.light,
      primary: {
        DEFAULT: "199 89% 48%",
        foreground: "0 0% 100%",
      },
      secondary: {
        DEFAULT: "187 47% 55%",
        foreground: "0 0% 100%",
      },
    },
    dark: {
      ...defaultTheme.dark,
      primary: {
        DEFAULT: "199 89% 58%",
        foreground: "0 0% 0%",
      },
      secondary: {
        DEFAULT: "187 47% 45%",
        foreground: "0 0% 100%",
      },
    },
  },
  forest: {
    ...defaultTheme,
    light: {
      ...defaultTheme.light,
      primary: {
        DEFAULT: "142 76% 36%",
        foreground: "0 0% 100%",
      },
      secondary: {
        DEFAULT: "82 39% 50%",
        foreground: "0 0% 100%",
      },
    },
    dark: {
      ...defaultTheme.dark,
      primary: {
        DEFAULT: "142 70% 45%",
        foreground: "0 0% 0%",
      },
      secondary: {
        DEFAULT: "82 39% 40%",
        foreground: "0 0% 100%",
      },
    },
  },
} as const;

export type ThemeName = keyof typeof themes;
