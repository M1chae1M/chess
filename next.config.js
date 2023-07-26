const TerserPlugin = require('terser-webpack-plugin');
const withTM = require('next-transpile-modules')(['path/to/your_modules']); // Dodaj nazwy modułów, które chcesz traktować jako bezpieczne dla minifikacji

module.exports = withTM({
  reactStrictMode: true,

  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ];
    }

    return config;
  },
});
