module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb-base',
    env: {
      browser: true,
      node: true,
    },
    rules: {
      'comma-dangle': 'off',
      'no-console': 'off',
      'jsx-quotes': 'off',
      'global-require': 'off',
      'import/extensions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'no-restricted-globals': 'off',
      'linebreak-style': ['off', 'windows'],
      "no-unused-vars":"off",
      'arrow-body-style': 'off',
    },
  };