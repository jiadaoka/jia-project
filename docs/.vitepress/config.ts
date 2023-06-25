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
                style: [
                    `
                .jia-space + .jia-space{
                    margin-top:10px;
                }
                `,
                ],
                cssUrl: ['@panda-jia/ui-vue/dist/theme/default/index.css', 'remixicon/fonts/remixicon.css'],
            })
        },
    },
}
