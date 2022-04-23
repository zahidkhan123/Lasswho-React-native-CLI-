module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-catch-shadow': 'off',
    'no-shadow': 'off',
    'react-native/no-inline-styles': 'off',
    'eslint-comments/no-unused-disable': 'off',
  },
};
