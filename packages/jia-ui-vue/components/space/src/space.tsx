import { defineComponent, renderSlot } from 'vue'
import globalConfig from '@ui-vue/common/config.ts'
const cssName = globalConfig.cssName!.createBlock('space')

export default defineComponent({
    name: 'JiaSpace',
    setup(props, { slots }) {
        return () => {
            const children = renderSlot(slots, 'default')

            if (!Array.isArray(children.children) || children.children.length === 0) return <div class={[cssName.base(), cssName.m('empty')]}></div>
            const itemCss = cssName.plus('item')
            const domList: JSX.Element[] = []
            children.children.forEach((item) => {
                domList.push(<div class={[itemCss.base()]}>{item}</div>)
            })

            return <div class={[cssName.base()]}>{domList}</div>
        }
    },
})
