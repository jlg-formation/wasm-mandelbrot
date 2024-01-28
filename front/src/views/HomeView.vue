<script setup lang="ts">
import { Mandelbrot, mandelBrots } from '@/Mandelbrot'
import { setCanvasDim } from '@/utils/canvas.utils'
import { debounce } from '@/utils/debounce'
import { getViewBoxFromCanvas } from '@/utils/viewbox'
import { onMounted, ref, watch } from 'vue'

const canvasWasm = ref<HTMLCanvasElement | undefined>(undefined)
const canvasJs = ref<HTMLCanvasElement | undefined>(undefined)

const wasmProfile = ref(0)
const jsProfile = ref(0)

const iteration = ref(30)
const max = ref(5)

onMounted(async () => {
  if (canvasJs.value === undefined) {
    throw new Error('cannot find canvasJs')
  }
  if (canvasWasm.value === undefined) {
    throw new Error('cannot find canvasWasm')
  }

  const canvasWidth = 300

  setCanvasDim(canvasJs.value, canvasWidth)
  setCanvasDim(canvasWasm.value, canvasWidth)

  const jsViewBox = getViewBoxFromCanvas(canvasJs.value, 4.5, { x: -0.5, y: 0 })
  const wasmViewBox = getViewBoxFromCanvas(canvasWasm.value, 4.5, { x: -0.5, y: 0 })

  const mandelbrotJs = new Mandelbrot({
    techno: 'js',
    canvas: canvasJs.value,
    viewBox: jsViewBox,
    iteration: iteration.value,
    max: max.value
  })
  await mandelbrotJs.instantiate()
  const mandelbrotWasm = new Mandelbrot({
    techno: 'wasm',
    canvas: canvasWasm.value,
    viewBox: wasmViewBox,
    iteration: iteration.value,
    max: max.value
  })
  await mandelbrotWasm.instantiate()

  while (mandelBrots.length > 0) {
    mandelBrots.pop()
  }
  mandelBrots.push(mandelbrotJs)
  mandelBrots.push(mandelbrotWasm)

  wasmProfile.value = await mandelbrotWasm.draw()
  jsProfile.value = await mandelbrotJs.draw()

  const debounceDelay = 300

  const onWatch = debounce(debounceDelay, async () => {
    mandelbrotJs.setConfig({
      iteration: +iteration.value,
      max: +max.value
    })
    mandelbrotWasm.setConfig({
      iteration: +iteration.value,
      max: +max.value
    })
    // const [js, wasm] = await Promise.all([mandelbrotJs.draw(), mandelbrotWasm.draw()])

    const wasm = await mandelbrotWasm.draw()
    wasmProfile.value = wasm
    // await sleep(2000)
    const js = await mandelbrotJs.draw()
    jsProfile.value = js
  })

  watch(max, onWatch)
  watch(iteration, onWatch)
})
</script>

<template>
  <main>
    <div class="canvas">
      <canvas class="wasm" ref="canvasWasm"></canvas>
      <canvas class="js" ref="canvasJs"></canvas>
    </div>
    <div class="command">
      <label>
        <span>Iterations: {{ iteration }}</span>
        <input type="range" name="" id="" min="1" max="1000" v-model="iteration" />
      </label>
      <label>
        <span>Trigger: {{ max }}</span>
        <input type="range" name="" id="" min="0" max="10" v-model="max" step="0.01" />
      </label>
    </div>
    <div class="stats">
      <table>
        <thead>
          <tr>
            <th class="techno">Technology</th>
            <th class="time">Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          <tr class="wasm">
            <td class="name">WASM</td>
            <td class="value number">{{ wasmProfile }}</td>
          </tr>
          <tr class="js">
            <td class="name">JS</td>
            <td class="value number">{{ jsProfile }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped lang="scss">
div.canvas {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;

  canvas {
    border: 0.1em solid black;
    flex: 1;
    cursor: pointer;
  }
}

div.command {
  border: 0.1em solid black;

  display: flex;
  flex-flow: column;
  padding: 0.5em;
  gap: 0.5em;

  label {
    display: flex;
    flex-flow: column;
  }
}

div.stats {
  table {
    border-spacing: 0.1em;
    border-collapse: separate;
    background-color: black;
    th,
    td {
      padding: 0.5em 1em;
    }

    th {
      background: #eee;
    }

    td {
      background: white;

      &.number {
        text-align: right;
      }
    }
  }
}
</style>
