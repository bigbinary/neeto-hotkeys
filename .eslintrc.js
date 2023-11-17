const defaultConfig = require("@bigbinary/neeto-commons-frontend/configs/eslint/index.js");

const { mergeDeepLeft } = require("ramda");

module.exports = mergeDeepLeft(
  {
    rules: {
      "@bigbinary/neeto/no-missing-localization": "off",
      "@bigbinary/neeto/webpack-aliases-and-jsconfig-paths-should-be-in-sync":
        "off",
    },
  },
  defaultConfig
);
