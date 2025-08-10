# Turbo Next.js プロジェクト

Next.js 15 + Hono + Drizzle ORM + shadcn/ui を使用したモダンなフルスタックアプリケーション

## 🚀 技術スタック

| カテゴリ | 技術 | バージョン/詳細 |
|----------|------|-----------------|
| **フレームワーク** | Next.js | v15, App Router, Turbo |
| **ランタイム** | Bun | パッケージマネージャ & ランタイム |
| **API** | Hono | Zod検証による型安全なAPIルート |
| **データベース** | PostgreSQL + Drizzle ORM | テーブルプレフィックスなし |
| **認証** | NextAuth.js | v5 beta, Discordプロバイダー |
| **状態管理** | Jotai + React Query | v5, Suspense有効 |
| **コード生成** | Orval | OpenAPI → TypeScript/Zod/React Query |
| **スタイリング** | Tailwind CSS | v4, PostCSS |
| **UIコンポーネント** | shadcn/ui | Radix UI + Tailwind CSS |
| **リンター** | Biome | v2.1.4, 自動フォーマット & 修正 |
| **TypeScript** | v5.9.2 | 厳格モード, パスエイリアス (`@/*`) |

## 📦 クイックスタート

```bash
# 環境変数の設定
cp .env.example .env.local  # DATABASE_URL, NEXTAUTH_* を設定

# 依存関係のインストール
bun install

# データベースの初期化
bun db:push

# 開発サーバーの起動
bun dev  # http://localhost:3000
```

## 🛠️ 開発コマンド

### 開発
```bash
bun dev              # Turboで開発サーバーを起動 (ポート3000)
bun preview          # ビルドして本番プレビューを起動
```

### コード品質
```bash
bun check            # Biomeチェックを実行
bun check:write      # Biomeで自動修正
bun check:unsafe     # Biomeで安全でない修正も含めて実行
bun typecheck        # TypeScript型チェック
```

### データベース
```bash
bun db:generate      # Drizzleマイグレーションを生成
bun db:migrate       # マイグレーションを実行
bun db:push          # スキーマをデータベースにプッシュ
bun db:studio        # Drizzle Studio GUIを開く
```

### API生成
```bash
bun schema           # OpenAPI仕様を生成し、Orval経由でAPIコードを再生成
```

## 🏗️ アーキテクチャ

### API層の構造

アプリケーションは階層化されたHono APIアーキテクチャを使用：

1. **OpenAPI定義** (`openapi/openapi.yml`): API契約の信頼できる情報源
2. **Orvalによるコード生成**:
   - サーバールート: `src/server/api/routes/`
   - クライアントクエリ: `src/app/generated/query/`
   - Zodスキーマ: `src/app/generated/zod/`
3. **Hono統合**: 
   - メインアプリ: `src/server/api/index.ts` (ミドルウェア、basePath設定)
   - 生成されたルート: `src/server/api/configured_api.ts` (自動生成されたルート構成)
   - Next.jsブリッジ: `src/app/api/[[...route]]/route.ts`

### 主要な統合ポイント

- **Hono + Next.js**: HonoアプリはNext.js App Routerのキャッチオールルートを通じて `/api` にマウント
- **認証フロー**: NextAuth.jsが `/api/auth/*` で認証を処理、セッションは `authMiddleware` 経由でHonoミドルウェアで利用可能
- **データベースアクセス**: PostgreSQLを使用したDrizzle ORM、`DATABASE_URL` 経由で接続
- **型安全性**: OpenAPI → Zod検証 → TypeScript型 → React Queryフックまでのエンドツーエンドの型安全性

## 🎨 UIコンポーネント (shadcn/ui)

### コンポーネントの追加

```bash
# 新しいコンポーネントを追加
bunx shadcn@latest add [component-name]

# 例
bunx shadcn@latest add button card dialog form input
```

### コンポーネントの場所とインポート

- コンポーネントは `src/app/components/ui/` にインストールされます
- インポート例: 
  ```tsx
  import { Button } from "@/app/components/ui/button"
  import { cn } from "@/app/lib/utils"
  ```

### テーマ設定

- CSS変数は `src/styles/globals.css` で定義
- CSSクラスによるライト/ダークモードサポート
- Tailwind設定でカスタマイズ可能

## 🔄 API開発フロー

```
openapi.yml → [bun schema] → Orval生成 → ハンドラー実装 → React Query使用
```

1. `openapi/openapi.yml` でAPIを定義
2. `bun schema` でコードを生成
3. `src/server/api/routes/*/handlers.ts` でロジックを実装
4. `src/app/generated/query/` からフックを使用

## 📁 プロジェクト構造

```
src/
├── app/                      # Next.js App Router
│   ├── api/                  # APIルート
│   ├── components/           # Reactコンポーネント
│   │   └── ui/              # shadcn/uiコンポーネント
│   ├── generated/           # 自動生成されたコード
│   ├── lib/                 # ユーティリティ関数
│   └── providers/           # Reactプロバイダー
├── server/                   # サーバーサイドコード
│   └── api/                 # Hono APIルート
└── styles/                   # グローバルスタイル
```

## 🔧 パスエイリアス

- `@/*` → `./src/*` (tsconfig.jsonで設定)
- `@/app/components/ui/*` → shadcn/uiコンポーネント
- `@/app/lib/utils` → ユーティリティ関数（cn()を含む）

## 💾 状態管理パターン

- **サーバー状態**: デフォルトでSuspenseが有効なReact Query
- **クライアント状態**: グローバルクライアント状態用のJotaiアトム
- **フォーム状態**: 検証用のZodスキーマ（OpenAPIから生成）

## ✅ コード品質基準

- Biomeによる一貫したフォーマット（ダブルクォート、2スペースインデント）
- TypeScript厳格モードと追加チェックが有効
- フォーマット時に未使用のインポート/変数を自動削除
- Tailwindクラスの自動ソート

## ⚠️ 重要な注意事項

### 自動生成ファイル（編集禁止）
- `src/server/api/configured_api.ts` - Orval生成のルート構成
- `src/server/api/routes/*/context.ts` - API型定義
- `src/app/generated/` - クライアントサイドの生成コード
- `src/app/components/ui/*` - shadcn/uiコンポーネント（慎重に修正）

### 設定ポイント
- **APIルーティング**: `configured_api.ts` のルートには `/api` プレフィックスが含まれる
- **DBテーブル**: テーブル名にプレフィックスは適用されない
- **Biome除外**: `validator.ts` は `any` と `{}` 型を許可
- **React 19**: 並行機能が有効

## 🐛 トラブルシューティング

- **404エラー**: `/src/app/api/[[...route]]/route.ts` の存在を確認
- **型エラー**: `z.infer` は型ユーティリティであり、ランタイム関数ではない
- **APIパスの重複**: `index.ts` のbasePath vs `configured_api.ts` のルートを確認
- **DB接続**: `DATABASE_URL` が適切に設定されていることを確認
- **Orval生成**: OpenAPI変更後に `bun schema` を実行

## 📚 詳細情報

このプロジェクトの詳細な技術情報については、[CLAUDE.md](./CLAUDE.md) を参照してください。

## 📄 ライセンス

プライベートプロジェクト