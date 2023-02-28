import { defineConfig } from 'vite'
import { initAlias } from '../build/index'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig(async () => {
    return {
        server: {
            fs: {
                allow: ['..'],
            },
        },
        plugins: [vueJsx(), DefineOptions()],
        resolve: {
            alias: [...(await initAlias())],
        },
    }
})
