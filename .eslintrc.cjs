module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  "extends": [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [ "react", "@typescript-eslint", "react-hooks" ],
  "rules": {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [ "error" ],
    "react/jsx-filename-extension": [ "warn", { "extensions": [ ".tsx" ] } ],
    "import/extensions": [ "error", "ignorePackages", { "ts": "never", "tsx": "never" } ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [ "error" ],
    "@typescript-eslint/explicit-function-return-type": [ "error", { "allowExpressions": true } ],
    "max-len": [ "warn", { "code": 100, "ignoreComments": true, "ignoreUrls": true } ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "prettier/prettier": [ "error", { "endOfLine": "auto" } ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
