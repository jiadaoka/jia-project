import type { App } from 'vue'
import componentList from './components/list'
export * from './components/map'
export const version = '0.0.0-dev'

const installer = {
    version,
    install(app: App) {
        componentList.forEach((component) => app.use(component))
    },
}

export { componentList }
export default installer
