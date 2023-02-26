import type { Plugin, DefineComponent } from 'vue'
import type { CssNameInstance } from '@packages/jia-utils/typescript'
import internal from 'stream'

declare global {
    type SFCWithInstall<T> = T & Plugin

    type PropsSizes = '' | 'small' | 'mini'
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $cssName: CssNameInstance
    }
}
