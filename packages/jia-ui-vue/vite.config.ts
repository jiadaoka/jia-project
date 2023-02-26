import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { initAlias } from '../../build/index'

// https://vitejs.dev/config/
export default defineConfig(async () => {
    return {
        plugins: [vue(), vueJsx(), DefineOptions()],
        build: {
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: resolve(__dirname, 'index.ts'),
                name: 'jiaUiVue',
                // the proper extensions will be added
                fileName: 'jia-ui-vue',
                formats: ['es', 'cjs', 'umd', 'iife'],
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue', 'jia-utils'],
                output: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: 'Vue',
                        'jia-utils': 'jiaUtils',
                    },
                },
            },
        },
        resolve: {
            alias: [...(await initAlias())],
        },
    }
})
