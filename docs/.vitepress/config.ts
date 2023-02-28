import type MarkdownIt from 'markdown-it'

import { nav, footer, sidebar } from './configs/index'
import { componentTransform } from '@panda-jia/vitepress-demo/plugin'
const base = '/'

export default {
    lang: 'zh-CN',
    title: 'jia-project',
    description: '学与练',
    base,
    themeConfig: {
        nav,
        footer,
        sidebar,
    },
    markdown: {
        config(md: MarkdownIt) {
            md.use(componentTransform, {
                style: ['.abc{width:100px}'],
                cssUrl: ['./../../packages/jia-ui-vue/theme/default/index.scss'],
            })
        },
    },
}
