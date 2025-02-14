/**
 * Rollup configuration.
 * NOTE: This is a CommonJS module so it can be imported by Karma.
 */
const path = require('path');

const alias = require('rollup-plugin-alias');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const { uglify } = require('rollup-plugin-uglify');


const ENV = process.env.NODE_ENV || 'development';

module.exports = {
    input: 'src/scripts/index.js',
    plugins: [
        alias({
            ngwmn: path.resolve(__dirname, 'src/scripts'),
            resolve: ['.js', '.json']
        }),
        resolve({
            mainFields: ['module']
        }),
        buble({
            objectAssign: 'Object.assign',
            transforms: {
                dangerousForOf: true
            }
        }),
        ENV === 'production' && uglify({
            compress: {
                dead_code: true,
                drop_console: true
            }
        })
    ],
    output: {
        name: 'ngwmn_ui',
        file: 'static/scripts/bundle.js',
        format: 'iife',
        sourcemap: ENV !== 'production' ? 'inline' : false
    },
    treeshake: ENV === 'production'
};
