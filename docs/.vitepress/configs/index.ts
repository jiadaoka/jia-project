import uiVue from './menu/ui-vue'
const nav = [
    {
        text: '笔记',
        link: '/pages/notes',
        activeMatch: '^/pages/notes',
    },
    {
        text: 'Vue 组件',
        link: '/pages/ui-vue/virtualizedList',
        activeMatch: '^/pages/ui-vue',
    },
]

const footer = {
    message: 'jia-project',
    copyright: 'Copyright © 2022-present eastBear',
}

const sidebar = {
    '/pages/ui-vue': uiVue,
}

export { nav, footer, sidebar }
