import type { Theme } from 'vitepress/dist/client'
import DefaultTheme from 'vitepress/theme'
import demoComponent, { beforeMountSymbol } from '@panda-jia/vitepress-demo/component'
import jiaUiVue from '@panda-jia/ui-vue'
// import './public.scss'

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.provide(beforeMountSymbol, (subApp) => {
            subApp.use(jiaUiVue)
        })
        app.component('demo', demoComponent)
    },
} as Theme
