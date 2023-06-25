import type { App } from 'vue'
import { registerLock } from './symbol.ts'
import componentMap from '@ui-vue/components/list.ts'

export const version = '0.0.0-dev'

export const installer = {
    version,
    install(app: App) {
        console.log(componentMap)
        // element-plus 通过这种方式来防止重复注册
        if (app[registerLock]) return

        app[registerLock] = true

        Object.values(componentMap).forEach((component) => app.use(component))
    },
}
