const defaultConfig = require("@bigbinary/neeto-commons-frontend/configs/eslint/index.js");

const { mergeDeepLeft } = require("ramda");

module.exports = mergeDeepLeft(
  {
    rules: {
      "@bigbinary/neeto/no-missing-localization": "off",
    },
  },
  defaultConfig
);
