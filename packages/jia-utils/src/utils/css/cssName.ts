import type { App } from 'vue'

class CssName {
    #namespace = ''

    /**
     * @param namespace
     */
    constructor(namespace: string = '') {
        this.#namespace = namespace
    }

    get namespace() {
        return this.#namespace
    }

    install(app: App) {
        app.config.globalProperties.$cssName = this
    }

    /**
     * 根据BEM格式生成class名字
     * 主要用于限制自身编写样式时可以严格遵守BEM命名
     *
     * @param blocks
     * @param element
     * @param modifier
     * @returns
     */
    #generateFullName(blocks: string[], element: string | null = null, modifier: string | null = null): string {
        const n = [...blocks]
        let name = ''

        if (n.length) {
            if (this.#namespace) {
                n[0] = `${this.#namespace}-${n[0]}`
            }

            if (element) {
                n.push(element)
            }

            name = n.join('__')

            if (modifier) {
                name += `--${modifier}`
            }
        }

        return name
    }

    /**
     * 创建block前缀用于公共使用
     * TODO element-plus虽然还有几种，先实现可能用到的
     * @param blocks TODO 长度限制好像意义不大，先放着
     */
    createBlock(blocks: string | string[]) {
        let n: string[] = []
        if (typeof blocks === 'string') {
            n.push(blocks)
        } else if (Array.isArray(blocks)) {
            n = [...blocks]
        }

        const base = () => this.#generateFullName(n)

        const b = (blockSuffix = '') => blockSuffix && this.#generateFullName([...n, blockSuffix]) // 临时使用这个
        const plus = (blockSuffix = '') => this.createBlock([...n, blockSuffix]) // 常用则返回这个
        const e = (element = '') => element && this.#generateFullName(n, element)
        const m = (modifier = '') => modifier && this.#generateFullName(n, '', modifier)
        const em = (element = '', modifier = '') => element && modifier && this.#generateFullName(n, element, modifier)
        const is = (status: string) => {
            if (!status) {
                throw new Error('CssName>createBlock>is：入参为空')
            }

            return 'is-' + status
        }

        return {
            base,
            b,
            plus,
            e,
            m,
            em,
            is,
        }
    }
}

export default CssName
export type CssNameInstance = InstanceType<typeof CssName>
