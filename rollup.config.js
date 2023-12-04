import path from "path";

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import analyze from "rollup-plugin-analyzer";
import cleaner from "rollup-plugin-cleaner";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { mergeDeepLeft } from "ramda";

import packageJson from "./package.json";

const commonResolve = require("@bigbinary/neeto-commons-frontend/configs/nanos/webpack/resolve.js");
const projectResolve = require("./resolve.js");

const formats = ["esm", "cjs"];
const { alias: aliasEntries } = mergeDeepLeft(projectResolve, commonResolve);
const peerDependencies = Object.keys(packageJson.peerDependencies);

const plugins = [
  cleaner({ targets: [path.resolve(__dirname, "dist")] }),
  // To automatically externalize peerDependencies in a rollup bundle.
  peerDepsExternal(),
  replace({
    preventAssignment: true,
  }),
  resolve({
    preferBuiltins: true,
    extensions: [".js", ".jsx", ".svg"],
  }),
  commonjs({ sourceMap: true }),
  alias({ entries: aliasEntries }),
  babel({
    babelHelpers: "runtime",
    sourceMaps: true,
  }),
  analyze({ summaryOnly: true }),
];

const output = formats.map(format => ({
  assetFileNames: "[name][extname]",
  file: format === "esm" ? "dist/index.js" : "dist/index.cjs.js",
  format,
  name: "NeetoHotkeysNano",
  sourcemap: true,
}));

export default {
  input: "./src/index.js",
  output,
  external: peerDependencies,
  plugins,
};
