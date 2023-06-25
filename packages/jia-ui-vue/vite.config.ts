import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

import { initAlias } from '../../build/index'

// https://vitejs.dev/config/
export default defineConfig(async () => {
    const alias = await initAlias()

    return {
        plugins: [
            vue(),
            vueJsx(),
            DefineOptions(),
            dts({
                root: '../../',
                entryRoot: './packages/jia-ui-vue/',
                tsConfigFilePath: './tsconfig.packages.json',
                include: ['packages/jia-ui-vue/**/*', 'typings/**/*'],
                outputDir: './packages/jia-ui-vue/dist/types',
            }),
        ],
        build: {
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: resolve(__dirname, 'index.ts'),
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue', '@panda-jia/utils'],
                output: [
                    {
                        format: 'es',
                        entryFileNames: '[name].js',
                        preserveModules: true,
                        exports: 'named',
                        dir: './dist/es',
                    },
                    {
                        format: 'cjs',
                        entryFileNames: '[name].js',
                        preserveModules: true,
                        exports: 'named',
                        dir: './dist/lib',
                    },
                ],
            },
        },
        resolve: {
            alias,
        },
    }
})
