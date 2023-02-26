import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { initAlias } from './build/index'

// https://vitejs.dev/config/
export default defineConfig(async () => {
    return {
        server: {
            port: 8080,
        },
        plugins: [
            vue({
                template: {
                    compilerOptions: {
                        // 将所有带短横线的标签名都视为自定义元素
                        isCustomElement: (tag) => tag.includes('custom-vue-'),
                    },
                },
            }),
            vueJsx(),
            DefineOptions(),
        ],
        resolve: {
            alias: [...(await initAlias())],
        },
    }
})
