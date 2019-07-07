import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "./src/index.js",
  output: {
    file: "./lib/index.js",
    format: "cjs",
    exports: "named"
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs()
  ],
  external: ["react"]
};
