import { CssName } from '@panda-jia/utils'

interface ConfigInterface {
    namespace: string
    cssName?: InstanceType<typeof CssName>
}

const config: ConfigInterface = {
    namespace: 'jia',
}

config.cssName = new CssName(config.namespace)

export default config
