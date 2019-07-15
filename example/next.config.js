/**
 * This resolves "Hooks can only be called inside the body of a function component." error
 * which happens when importing from lib/ directory outside of this example:
 * https://github.com/webpack/webpack/issues/8607#issuecomment-453068938
 */
// eslint-disable-next-line
module.exports = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve("react")
    };
    return config;
  }
};
