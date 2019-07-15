import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const extensions = [".ts"];

export default {
  input: "./src/index.ts",
  output: {
    file: "./lib/index.js",
    format: "cjs",
    exports: "named"
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
      extensions,
      include: ["src/**/*"]
    }),
    resolve({ extensions }),
    commonjs()
  ],
  external: ["react", "react-dom"]
};
