import vueComponents from './menu/vueComponents'
const nav = [
    {
        text: '笔记',
        link: '/pages/notes',
        activeMatch: '^/pages/notes',
    },
    {
        text: 'Vue 组件',
        link: '/pages/vueComponents/virtualizedList',
        activeMatch: '^/pages/vueComponents',
    },
]

const footer = {
    message: 'jia-project',
    copyright: 'Copyright © 2022-present eastBear',
}

const sidebar = {
    '/pages/vueComponents': vueComponents,
}

export { nav, footer, sidebar }
