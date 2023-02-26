<template>
    <button :class="[cssName.base(), cssName.m(size), cssName.m(type), disabled && cssName.is('disabled'), text && cssName.is('text')]">
        <span>
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import globalConfig from '../../../common/index'

defineOptions({
    name: 'JiaButton',
})

type PropsTypes = 'primary' | 'success' | 'warning' | 'info' | 'danger' | ''

interface Props {
    size?: PropsSizes
    type?: PropsTypes
    disabled?: Boolean
    text?: Boolean
}

const props = defineProps<Props>()
const { size, type, disabled, text } = toRefs(props)

const cssName = globalConfig.cssName!.createBlock('button')
</script>
