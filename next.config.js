const TerserPlugin = require('terser-webpack-plugin');
const withTM = require('next-transpile-modules')([
  // Dodaj tutaj nazwy modułów, które chcesz traktować jako bezpieczne dla minifikacji
]);

module.exports = withTM({
  reactStrictMode: true,

  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        })
      );
    }

    return config;
  },
});
