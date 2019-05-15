// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ["plugin:vue/essential", "plugin:prettier/recommended", "eslint:recommended"],
  // required to lint *.vue files
  plugins: [
    'vue',
    "prettier",
  ],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "prettier/prettier": [
      "error",
      {
        printWidth: 120, // 设置单行字符数
        tabWidth: 2, // 缩进空格数
        semi: true, // 代码行后面需不需要生成分号
        trailingComma: "none", // 数组后面最后一个索引要不要添加逗号
        singleQuote: true, // 需不需要把双引号格式化成单引号
        bracketSpacing: true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
        jsxBracketSameLine: true, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
        alwaysParens:'avoid', // 为单行箭头函数的参数添加圆括号
      }
    ]
  }
}
