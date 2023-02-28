<template>
    <div>
        <p>Js执行时间：{{ runTime + 'ms' }}</p>
        <p>绘画执行时间：{{ drawTime + 'ms' }}</p>

        <div>
            <ul id="largeList"></ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
const props = defineProps(['total'])

let runTime = ref(0) // 结束时间
let drawTime = ref(0) // 绘画完成时间

function init() {
    runTime.value = 0
    drawTime.value = 0

    const ul = document.getElementById('largeList')
    if (ul) {
        ul.innerHTML = ''
    }
}

async function onClick() {
    init()
    await nextTick()

    // 记录开始时间
    const startTime = Date.now()

    const ul = document.getElementById('largeList')

    const total = props.total
    if (ul) {
        for (let i = 0; i < total; i++) {
            const li = document.createElement('li')
            li.innerText = ~~(Math.random() * total) + ''
            ul.appendChild(li)
        }
    }

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
