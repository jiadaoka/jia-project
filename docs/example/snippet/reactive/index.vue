<template>
    <div>
        <p>从reactive出发，ref与直接赋值</p>
        <input v-model="reactive1.text" />

        <p>reactive：{{ reactive1.text }}</p>
        <p>ref：{{ ref1 }}，响应式丢失</p>
        <p>toRef：{{ toRef1 }}</p>
        <p>直接赋值：{{ text1 }}，响应式丢失</p>
    </div>
    <div>
        <p>从ref出发，reactive与直接赋值</p>
        <input v-model="ref2" />

        <p>reactive：{{ reactive2.text }}</p>
        <p>ref：{{ ref2 }}</p>
        <p>直接赋值：{{ text2 }}，响应式丢失</p>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRef, ref } from 'vue'

const reactive1 = reactive({
    text: '100',
})
const ref1 = ref(reactive1.text)
const toRef1 = toRef(reactive1, 'text')
const text1 = reactive1.text

const ref2 = ref(200)
const reactive2 = reactive({
    text: ref2,
})
const text2 = ref2.value
</script>

<style scoped></style>
