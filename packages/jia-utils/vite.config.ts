import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

import { initAlias } from '../../build/index'

// https://vitejs.dev/config/
export default defineConfig(async () => {
    const alias = await initAlias()

    return {
        plugins: [
            dts({
                root: '../../',
                entryRoot: './packages/jia-utils/src',
                tsConfigFilePath: './tsconfig.packages.json',
                include: ['packages/jia-utils/src/**/*', 'typings/**/*'],
                outputDir: './packages/jia-utils/dist/types',
            }),
        ],
        build: {
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'utils',
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue'],
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
