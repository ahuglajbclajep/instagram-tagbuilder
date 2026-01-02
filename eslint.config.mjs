import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier/flat";

/** @type {import("eslint").Linter.Config[]} */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  { languageOptions: { parserOptions: { projectService: true } } },
  { files: ["src/**/*.ts{,x}"] },
  { ignores: ["*.mjs", "*.ts"] },

  reactHooks.configs.flat.recommended,
  eslintConfigPrettier,
];
