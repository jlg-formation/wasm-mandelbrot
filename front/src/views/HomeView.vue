<script setup lang="ts">
import { Mandelbrot } from '@/Mandelbrot'
import { debounce } from '@/utils/debounce'
import { getViewBoxFromCanvas } from '@/utils/viewbox'
import { onMounted, ref, watch } from 'vue'

const canvasWidth = 400
const canvasHeight = 200

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

  const jsViewBox = getViewBoxFromCanvas(canvasJs.value, 4.5, { x: -0.5, y: 0 })

  const mandelbrotJs = new Mandelbrot({ techno: 'js', canvas: canvasJs.value })
  jsProfile.value = await mandelbrotJs.draw(jsViewBox, iteration.value, max.value)
  // const mandelbrotWasm = new Mandelbrot({ techno: 'wasm', canvas: canvasWasm.value })
  // await mandelbrotWasm.draw(viewBox, iteration, max)

  const debounceDelay = 300

  watch(
    max,
    debounce(debounceDelay, async () => {
      jsProfile.value = await mandelbrotJs.draw(jsViewBox, iteration.value, max.value)
    })
  )

  watch(
    iteration,
    debounce(debounceDelay, async () => {
      jsProfile.value = await mandelbrotJs.draw(jsViewBox, iteration.value, max.value)
    })
  )
})
</script>

<template>
  <main>
    <div class="canvas">
      <canvas class="wasm" ref="canvasWasm" :width="canvasWidth" :height="canvasHeight"></canvas>
      <canvas class="js" ref="canvasJs" :width="canvasWidth" :height="canvasHeight"></canvas>
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
