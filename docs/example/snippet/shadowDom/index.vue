<template>
    <div class="block inside-dom">
        <div>
            <video class="outline"></video>
        </div>
        <div>
            <input type="text" />
        </div>
    </div>
    <div class="block">
        <div>
            <span> Shadow DOM </span>
        </div>
        <div>
            <button @click="getShadowRoot">获取ShadowRoot</button>
            <button @click="getShadowRoot">不允许重复声明</button>
            <button @click="resetShadowDom">再来一次</button>
        </div>
        <div class="div-style">
            <p>这是外部第一段文字</p>
            <p class="text-style">这是外部的第二段文字</p>
            <p class="text-style2">这是外部第三段文字</p>
            <div class="external-style" ref="externalStyle"></div>
            <div id="host" ref="host" class="outline"><span>普通DOM</span></div>
            <div id="host2" ref="host2" class="outline"></div>
        </div>

        <div class="event-style">
            <div ref="eventHost"></div>
        </div>

        <div>
            <custom-vue-button>11111111111</custom-vue-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineCustomElement } from 'vue'
import { button } from '@packages/jia-ui-vue/index'

const host = ref<Element>()
const host2 = ref<Element>()
const externalStyle = ref<Element>()
const eventHost = ref<Element>()

onMounted(() => {
    handlerShadowDom(host.value!)
    handlerShadowDom2(host2.value!)
    handlerShadowDomEvent(eventHost.value!)

    handlerVueCustom()
})

function handlerShadowDom(host: Element) {
    externalStyle.value!.innerHTML = `
    <style>
        .text-style2{
            font-weight: bold;
        }
    </style>
    `

    let shadowRoot = host.attachShadow({ mode: 'open' })
    console.log('handlerShadowDom,open', shadowRoot)

    const div1 = document.createElement('div')
    div1.innerHTML = `
        <style>
            p{
                font-size:20px;
            }

            .text-stye{
                color:#409eff;
            }
        </style>
        <p>这是内部一段话</p>
        <p class="text-style">这是内部第二段话</p>
        <p class="text-style" style="all: initial;">这是第三段话</p>
    `

    shadowRoot.appendChild(div1)
}

function handlerShadowDom2(host: Element) {
    let shadowRoot = host.attachShadow({ mode: 'closed' })
    console.log('handlerShadowDom,closed', shadowRoot)

    const div1 = document.createElement('div')
    const input = document.createElement('input')
    div1.appendChild(input)
    shadowRoot.appendChild(div1)
}

function getShadowRoot() {
    console.log('getShadowRoot =====')
    console.log('handlerShadowDom,open', host.value!.shadowRoot)
    console.log('handlerShadowDom,closed', host2.value!.shadowRoot)
}

function handlerShadowDomEvent(host: Element) {
    const shadowRoot = host.attachShadow({ mode: 'open' })

    const div1 = document.createElement('div')
    div1.id = 'div1'

    div1.innerHTML = `
    <style>
    div{
        padding-right:200px;
        height:20px;
    }

    #div1{
        background: #409eff;
    }
    #div2{
        background: #f56c6c;
    }
    #div3{
        background: #67c23a;
    }
    </style>
    `

    const div2 = document.createElement('div')
    div2.id = 'div2'

    const div3 = document.createElement('div')
    div3.id = 'div3'

    div1.appendChild(div2)
    div2.appendChild(div3)

    shadowRoot.appendChild(div1)

    shadowRoot.querySelector('#div3')?.addEventListener('click', (event) => {
        console.log('click-div3====', event.target)
        window.dispatchEvent(new CustomEvent('clickDiv3'))
    })

    shadowRoot.querySelector('#div2')?.addEventListener('click', (event) => {
        console.log('click-div2====', event.target)
    })

    shadowRoot.querySelector('#div1')?.addEventListener('click', (event) => {
        console.log('click-div1====', event.target)
    })

    document.querySelector('.event-style')?.addEventListener('click', (event) => {
        console.log('click-event-style====', event.target)
        const path = event.composedPath()
        console.log('path', path)
    })

    document.querySelector('#div3')?.addEventListener('click', (event) => {
        console.log('click-event-div3', event.target)
    })

    window.addEventListener('clickDiv3', (event) => {
        console.log('clickDiv3=======', event.target)
    })
}

function handlerVueCustom() {
    const customButton = defineCustomElement(button)
    customElements.define('custom-vue-button', customButton)
}

function resetShadowDom() {
    host.value!.attachShadow({ mode: 'closed' })
    host2.value!.attachShadow({ mode: 'open' })
}
</script>

<style scoped lang="scss">
.block {
    margin-top: 10px;
}

.inside-dom {
    & > div {
        margin-top: 10px;
    }
}
.outline {
    outline: 1px solid #333;
    margin: 3px;
}

button {
    margin: 3px;
}

#host2 {
    &:focus-within {
        outline: 2px solid red;
    }
}

.div-style {
    color: #f56c6c;
}

.text-style {
    color: #67c23a;
}

#host {
    font-weight: bold;
}
</style>
