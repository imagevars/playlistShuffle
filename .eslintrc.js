module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "global-require": 0,
    "import/no-unresolved": "error",
    "no-shadow": "off",
    "default-param-last": 0,
    "jsx-a11y/click-events-have-key-events": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
};
