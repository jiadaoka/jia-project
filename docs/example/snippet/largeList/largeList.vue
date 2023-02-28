<template>
    <div>
        <!-- <p>开始时间：{{ startTime  }}</p> -->
        <p>Js执行时间：{{ runTime + 'ms' }}</p>
        <p>绘画执行时间：{{ drawTime + 'ms' }}</p>

        <div>
            <ul>
                <li v-for="item in arr">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'

const props = defineProps(['total'])
let runTime = ref(0) // 结束时间
let drawTime = ref(0) // 绘画完成时间

let arr: number[] = reactive([])

function init() {
    runTime.value = 0
    drawTime.value = 0
    arr = reactive([])
}

async function onClick() {
    init()
    await nextTick()

    // 记录开始时间
    const startTime = Date.now()

    const total = props.total
    const _arr: number[] = []
    for (let i = 0; i < total; i++) {
        _arr.push(~~(Math.random() * total))
    }

    arr = _arr

    runTime.value = Date.now() - startTime

    setTimeout(() => {
        drawTime.value = Date.now() - startTime
    })
}

defineExpose({
    onClick,
})
</script>

<style scoped></style>
