module.exports = {
    parserOptions: {
      ecmaVersion: 'latest',
    },
    extends: ['plugin:vue/vue3-recommended', '@vue/eslint-config-typescript'],
    plugins: ['vue'],
    env: {},
    rules: {
      'vue/custom-event-name-casing': 'warn',
      'vue/require-explicit-emits': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/html-closing-bracket-newline': 'warn',
      "semi": [2, "always"],
      "quotes": [2, "single", { "avoidEscape": true }]
    },
  };