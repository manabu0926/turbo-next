/**
 * テーマ管理システム
 *
 * 使用方法:
 * 1. テーマ設定を変更する場合は colors.ts を編集
 * 2. 新しいテーマを追加する場合は themes オブジェクトに追加
 * 3. CSS を生成する場合は generateThemeCSS を使用
 */

export * from "./colors";
export * from "./generator";

// 使用例
import { themes } from "./index";

// デフォルトテーマのCSS生成例
// const css = generateThemeCSS(themes.default);

// カスタムテーマの作成例
export const createCustomTheme = (overrides: {
  primaryColor?: string;
  secondaryColor?: string;
  successColor?: string;
  warningColor?: string;
  errorColor?: string;
}) => {
  const theme = { ...themes.default };

  if (overrides.primaryColor) {
    theme.light.primary.DEFAULT = overrides.primaryColor;
    // ダークモード用に明度を調整することも可能
  }

  if (overrides.secondaryColor) {
    theme.light.secondary.DEFAULT = overrides.secondaryColor;
  }

  if (overrides.successColor) {
    theme.light.success.DEFAULT = overrides.successColor;
    theme.dark.success.DEFAULT = overrides.successColor;
  }

  if (overrides.warningColor) {
    theme.light.warning.DEFAULT = overrides.warningColor;
    theme.dark.warning.DEFAULT = overrides.warningColor;
  }

  if (overrides.errorColor) {
    theme.light.error.DEFAULT = overrides.errorColor;
    theme.dark.error.DEFAULT = overrides.errorColor;
  }

  return theme;
};
