import type { Theme } from 'vitepress/dist/client'
import DefaultTheme from 'vitepress/theme'
import demoComponent from '@panda-jia/vitepress-demo/component'
import jiaUiVue from '@packages/jia-ui-vue/index'
// import './public.scss'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('demo', demoComponent)
        app.use(jiaUiVue)
    },
} as Theme
