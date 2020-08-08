module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 11,
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "import/no-cycle": "off",
        "max-classes-per-file": "off"
      }
    }
  ],
  rules: {
    "prettier/prettier": ["error"],
  },
};
