import path from "path";

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import analyze from "rollup-plugin-analyzer";
import cleaner from "rollup-plugin-cleaner";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { globSync } from "glob";
import { keys } from "ramda";

import packageJSON from "./package.json";
const rootResolve = require("./resolve.js");

const globals = Object.fromEntries(
  keys(packageJSON.peerDependencies).map(lib => [lib, lib])
);

export default {
  input: "./src/index.js",
  output: [
    {
      inlineDynamicImports: true,
      file: `dist/index.cjs.js`,
      format: "cjs",
      sourcemap: true,
      name: `neeto-hotkeys/index`,
      globals,
    },
    {
      inlineDynamicImports: true,
      file: `dist/index.mjs`,
      format: "esm",
      sourcemap: true,
      name: `neeto-hotkeys/index`,
      globals,
    },
  ],
  plugins: [
    // To delete previously existing bundle.
    cleaner({ targets: globSync(path.resolve(__dirname, `dist/index.*`)) }),
    // To automatically externalize peerDependencies in a rollup bundle.
    peerDepsExternal(),
    // To use third party modules from node_modules
    resolve({
      extensions: [".js", ".jsx", ".svg"],
    }),
    commonjs({ sourceMap: true }),
    // To define aliases when bundling packages.
    alias({ entries: rootResolve.alias }),
    // To integrate Rollup and Babel.
    babel({
      babelHelpers: "runtime",
      sourceMaps: true,
    }),
    // Analyze created bundle.
    analyze({ summaryOnly: true }),
  ],
};
