import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace'
import pkg from './package.json'

export default [
    {
        input: 'src/index.js',
        output: {
            name: 'VueRecaptcha',
            file: pkg.browser,
            format: 'umd',
            globals: {
                vue: 'Vue'
            }
        },
        external: ['vue'],
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            vue(),
            resolve(),
            commonjs()
        ]
    },
    {
        input: 'src/index.js',
        external: ['vue'],
        output: {
            file: pkg.module,
            format: 'es'
        },
        plugins: [
            vue()
        ]
    }
]