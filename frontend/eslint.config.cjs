module.exports = [
  {
    ignores: ["dist/**", "coverage/**", "node_modules/**", "src/assets/**"]
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: ["tsconfig.app.json", "tsconfig.spec.json"],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "@angular-eslint": require("@angular-eslint/eslint-plugin")
    },
    rules: {
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@angular-eslint/directive-selector": [
        "error",
        { "type": "attribute", "prefix": "app", "style": "camelCase" }
      ],
      "@angular-eslint/component-selector": [
        "error",
        { "type": "element", "prefix": "app", "style": "kebab-case" }
      ]
    }
  },

  {
    files: ["**/*.html"],
    languageOptions: {
      parser: require("@angular-eslint/template-parser")
    },
    plugins: {
      "@angular-eslint/template": require("@angular-eslint/eslint-plugin-template")
    },
    rules: {
      "@angular-eslint/template/no-any": "warn",
      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/eqeqeq": "warn",
      "@angular-eslint/template/no-negated-async": "warn"
    }
  }
];
