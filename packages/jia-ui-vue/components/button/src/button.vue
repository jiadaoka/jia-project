<template>
    <button :class="[cssName.base(), cssName.m(size), cssName.m(type), disabled && cssName.is('disabled'), text && cssName.is('text')]">
        <i v-if="icon" :class="[cssName.e('icon'), icon]"></i>
        <span :class="[cssName.e('text')]">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import globalConfig from '@ui-vue/common/config.ts'

defineOptions({
    name: 'JiaButton',
})

type PropsTypes = 'primary' | 'success' | 'warning' | 'info' | 'danger' | ''

interface Props {
    size?: PropsSizes
    type?: PropsTypes
    disabled?: Boolean
    text?: Boolean
    icon?: String
}

const props = defineProps<Props>()
const { size, type, disabled, text, icon } = toRefs(props)

const cssName = globalConfig.cssName!.createBlock('button')
</script>
