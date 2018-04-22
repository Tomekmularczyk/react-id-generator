import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: './src/index.jsx',
  output: {
    file: './lib/index.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      externalHelpers: true
    }),
    resolve(),
    commonjs()
  ],
  external: ['react']
}
