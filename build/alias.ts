import type { Alias } from 'vite'
import { resolve } from 'path'

export async function initAlias(): Promise<Alias[]> {
    const alias: Alias[] = [
        {
            find: '@src',
            replacement: resolve(__dirname, '../src'),
        },
        {
            find: '@docs',
            replacement: resolve(__dirname, '../docs'),
        },

        {
            find: '@packages',
            replacement: resolve(__dirname, '../packages'),
        },
        {
            find: '@ui-vue',
            replacement: resolve(__dirname, '../packages/jia-ui-vue'),
        },
    ]

    return alias
}
