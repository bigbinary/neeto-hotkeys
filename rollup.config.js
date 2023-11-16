import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import svgr from "@svgr/rollup";
import analyze from "rollup-plugin-analyzer";
import cleaner from "rollup-plugin-cleaner";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const plugins = [
  cleaner({
    targets: ["./dist/"],
  }),
  peerDepsExternal(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true,
  }),
  resolve({
    browser: true,
    preferBuiltins: true,
    extensions: [".js", ".jsx", ".svg"],
  }),
  svgr(),
  commonjs({ include: "node_module/" }),
  json(),
  babel({ babelHelpers: "runtime" }),
  analyze({ summaryOnly: true }),
];

const formats = ["esm", "cjs"];

const getOutputConfigs = outputPath =>
  formats.map(format => ({
    file: format === "esm" ? `${outputPath}.js` : `${outputPath}.cjs.js`,
    format,
    sourcemap: true,
    inlineDynamicImports: true,
  }));

export default [
  {
    input: "src/index.js",
    output: getOutputConfigs("dist/index"),
    plugins,
  },
];
