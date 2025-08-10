# テーマ管理システム

ライト/ダークモードごとのテーマカラーを簡単に管理できるシステムです。

## 📁 ファイル構成

```
src/lib/theme/
├── colors.ts      # テーマカラー定義とプリセット
├── generator.ts   # CSS変数生成ユーティリティ
├── index.ts       # エクスポートとヘルパー関数
└── README.md      # このドキュメント
```

## 🎨 カラー体系

### 基本カラー
- `primary` - プライマリカラー（主要なアクション）
- `secondary` - セカンダリカラー（補助的なアクション）
- `background` - 背景色
- `foreground` - 前景色（テキスト）

### セマンティックカラー
- `success` - 成功・完了状態
- `warning` - 警告・注意状態
- `error` - エラー・失敗状態
- `info` - 情報・通知状態
- `destructive` - 破壊的アクション（削除など）

### UIカラー
- `muted` - 弱いコントラストのUI要素
- `accent` - アクセントカラー
- `card` - カードコンポーネント
- `popover` - ポップオーバー
- `border` - ボーダー
- `input` - 入力フィールド
- `ring` - フォーカスリング

## 🚀 使用方法

### 1. Tailwind CSSクラスで使用

```tsx
// 成功メッセージ
<div className="bg-success text-success-foreground p-4 rounded">
  処理が完了しました
</div>

// 警告ボタン
<button className="bg-warning text-warning-foreground px-4 py-2 rounded">
  注意が必要です
</button>

// エラーアラート
<div className="border-l-4 border-error bg-error/10 p-4">
  <p className="text-error">エラーが発生しました</p>
</div>
```

### 2. カスタムテーマの作成

```typescript
import { createCustomTheme, generateThemeCSS } from "@/lib/theme";

// カスタムテーマを作成
const myTheme = createCustomTheme({
  primaryColor: "220 90% 56%",    // 青系
  secondaryColor: "142 76% 36%",  // 緑系
  successColor: "142 76% 36%",    // 緑
  warningColor: "38 92% 50%",     // オレンジ
  errorColor: "0 84% 60%",        // 赤
});

// CSS文字列を生成（必要な場合）
const css = generateThemeCSS(myTheme);
```

### 3. プリセットテーマの使用

```typescript
import { themes } from "@/lib/theme";

// デフォルトテーマ
const defaultTheme = themes.default;

// オーシャンテーマ（青系）
const oceanTheme = themes.ocean;

// フォレストテーマ（緑系）
const forestTheme = themes.forest;
```

## 🎯 カラー値の形式

HSL（Hue Saturation Lightness）形式で定義：

```
"色相 彩度% 明度%"
```

例：
- `"0 84% 60%"` - 赤系
- `"142 76% 36%"` - 緑系
- `"220 90% 56%"` - 青系
- `"38 92% 50%"` - オレンジ系

## 💡 テーマカラーを変更する方法

### 方法1: CSS変数を直接編集
`src/styles/globals.css` のCSS変数を編集：

```css
:root {
  --primary: 220 90% 56%;  /* 新しい色に変更 */
  --success: 142 76% 36%;
}

.dark {
  --primary: 220 85% 65%;  /* ダークモード用 */
  --success: 142 70% 45%;
}
```

### 方法2: TypeScriptでテーマを管理
`src/lib/theme/colors.ts` でテーマを定義：

```typescript
export const customTheme: ThemeConfig = {
  light: {
    primary: {
      DEFAULT: "220 90% 56%",
      foreground: "0 0% 100%",
    },
    // ...
  },
  dark: {
    primary: {
      DEFAULT: "220 85% 65%",
      foreground: "0 0% 0%",
    },
    // ...
  },
  // ...
};
```

## 🔧 高度な使い方

### コンポーネントバリアント

```tsx
const alertVariants = {
  default: "bg-background text-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  error: "bg-error text-error-foreground",
  info: "bg-info text-info-foreground",
};

function Alert({ variant = "default", children }) {
  return (
    <div className={cn("p-4 rounded", alertVariants[variant])}>
      {children}
    </div>
  );
}
```

### 動的テーマ切り替え

```typescript
// テーマを動的に適用する関数
function applyTheme(theme: ThemeConfig) {
  const css = generateThemeCSS(theme);
  const styleElement = document.getElementById("dynamic-theme") || 
    document.createElement("style");
  styleElement.id = "dynamic-theme";
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}

// 使用例
applyTheme(themes.ocean);
```

## 📝 ベストプラクティス

1. **一貫性を保つ**: 同じ用途には同じセマンティックカラーを使用
2. **アクセシビリティ**: foreground色は背景色とのコントラスト比を確保
3. **ダークモード対応**: 両モードで適切な明度を設定
4. **セマンティックな命名**: 色の用途が明確になる名前を使用

## 🎨 カラーパレット例

### Success（成功）
- Light: `142 76% 36%` (緑)
- Dark: `142 70% 45%` (明るい緑)

### Warning（警告）
- Light: `38 92% 50%` (オレンジ)
- Dark: `38 92% 50%` (同じオレンジ)

### Error（エラー）
- Light: `0 84% 60%` (赤)
- Dark: `0 72% 51%` (暗い赤)

### Info（情報）
- Light: `199 89% 48%` (青)
- Dark: `199 89% 48%` (同じ青)