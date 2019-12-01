module.exports = function override(config) {
  config.optimization.runtimeChunk = false;
  // JS
config.output.filename = 'static/js/main.js';
// CSS. "5" is MiniCssPlugin
config.plugins[5].options.filename = 'static/css/styles.css';
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false
    }
  };
  return config;
};