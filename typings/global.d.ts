import type { Plugin, DefineComponent } from 'vue'
import type { cssNameInstance } from '@packages/jia-utils/typescript'
import type { registerLock } from '@ui-vue/common/symbol'

declare global {
    type SFCWithInstall<T> = T & Plugin

    type PropsSizes = '' | 'small' | 'mini'
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $cssName: CssNameInstance
    }
}

declare module '@vue/runtime-core' {
    export interface App {
        [registerLock]?: boolean
    }
}
