/**
 * @type {import('@rollup/plugin-babel').RollupBabelOutputPluginOptions}
 * */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
  ],
};
