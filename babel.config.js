module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens': './app/screens',
          '@components': './app/components',
          '@generated': './app/operations/generated',
          '@utils': './app/utils',
          '@context': './app/context',
          '@global-styles': './app/styles',
          // '@assets': './app/assets',
          '@tailwind': './tailwind.ts',
          '@config': './app/config/config.ts',
          '@cache': './app/cache.ts',
        },
      },
    ],
  ],
};
