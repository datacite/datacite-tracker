import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';
import pkg from './package.json';

export default [{
    input: 'dist/index.js',
    output: {
        name: "DataCiteTracker",
        file: pkg.browser,
        format: 'iife',
        sourcemap: true,
        exports: 'named',
    },
    plugins: [
        resolve(),
        commonjs(),
        minify({ comments: false }),
    ],
}]