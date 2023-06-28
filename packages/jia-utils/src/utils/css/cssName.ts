import type { App } from 'vue'

interface CssConfig {
    commonSeparator?: string
    elementSeparator?: string
    modifierSeparator?: string
    statePrefix?: string
}

/**
 * 初始化实例参数
 */
class CssName {
    #namespace = ''

    #commonSeparator = '-'
    #elementSeparator = '__'
    #modifierSeparator = '--'
    #statePrefix = 'is-'
    #cssVarPrefix = '--'

    constructor(namespace: string = '', config: CssConfig = {}) {
        this.#namespace = namespace

        if (typeof config.commonSeparator === 'string') {
            this.#commonSeparator = config.commonSeparator
        }

        if (typeof config.elementSeparator === 'string') {
            this.#elementSeparator = config.elementSeparator
        }

        if (typeof config.modifierSeparator === 'string') {
            this.#modifierSeparator = config.modifierSeparator
        }

        if (typeof config.statePrefix === 'string') {
            this.#statePrefix = config.statePrefix
        }
    }

    get namespace() {
        return this.#namespace
    }

    get config(): CssConfig {
        return {
            commonSeparator: this.#commonSeparator,
            elementSeparator: this.#elementSeparator,
            modifierSeparator: this.#modifierSeparator,
            statePrefix: this.#statePrefix,
        }
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
                n[0] = `${this.#namespace}${this.#commonSeparator}${n[0]}`
            }

            if (element) {
                n.push(element)
            }

            name = n.join(this.#elementSeparator)

            if (modifier) {
                name += `${this.#modifierSeparator}${modifier}`
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

            return this.#statePrefix + status
        }
        const getCssVarName = (...list: string[]) => this.getCssVarName(...n, ...list)

        return {
            base,
            b,
            plus,
            e,
            m,
            em,
            is,
            getCssVarName,
        }
    }

    getCssVarName(...list: string[]) {
        return `${this.#cssVarPrefix}${this.#namespace}${this.#commonSeparator}${list.join(this.#commonSeparator)}`
    }
}

export default CssName
export type CssNameInstance = InstanceType<typeof CssName>
