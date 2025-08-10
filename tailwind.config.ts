import type { Config } from "tailwindcss";

const config: Config = {
  // コンテンツのパスは引き続き必要
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  // ダークモード設定
  darkMode: "class",
  // プラグイン設定
  plugins: [],
};

export default config;
