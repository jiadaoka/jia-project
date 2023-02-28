<template>
    <input v-model="total" />
    <div class="demo-large-list">
        <div class="demo-large-list-item">
            <button @click="onVueClick">点击生成列表(Vue)</button>
            <largeListVue ref="largeList" :total="total" />
        </div>
        <div class="demo-large-list-item">
            <button @click="onDomClick">点击生成列表(native)</button>
            <largeListDom ref="largeListNative" :total="total" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import largeListVue from './largeList.vue'
import largeListDom from './largeListNative.vue'
const largeList = ref()
const largeListNative = ref()

let total = ref(10000)

function onVueClick() {
    largeList.value.onClick()
}

function onDomClick() {
    largeListNative.value.onClick()
}
</script>

<style scoped lang="scss">
.demo-large-list {
    width: 100%;
    display: flex;

    .demo-large-list-item {
        width: 50%;
        max-height: 400px;
        overflow-y: auto;
    }
}
</style>
