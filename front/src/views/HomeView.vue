<script setup lang="ts">
import { Mandelbrot } from '@/Mandelbrot'
import type { ViewBox } from '@/utils/image'
import { ref, onMounted, watch } from 'vue'

const canvasWasm = ref<HTMLCanvasElement | undefined>(undefined)
const canvasJs = ref<HTMLCanvasElement | undefined>(undefined)

const width = 200
const height = 100

const iteration = ref(100)
const max = ref(2)

onMounted(async () => {
  if (canvasJs.value === undefined) {
    throw new Error('cannot find canvasJs')
  }
  if (canvasWasm.value === undefined) {
    throw new Error('cannot find canvasWasm')
  }

  const viewBox: ViewBox = {
    topLeft: { x: -2, y: 1 },
    bottomRight: { x: 2, y: -1 }
  }

  const mandelbrotJs = new Mandelbrot({ techno: 'js', canvas: canvasJs.value })
  await mandelbrotJs.draw(viewBox, iteration.value, max.value)
  // const mandelbrotWasm = new Mandelbrot({ techno: 'wasm', canvas: canvasWasm.value })
  // await mandelbrotWasm.draw(viewBox, iteration, max)

  watch(max, async () => {
    await mandelbrotJs.draw(viewBox, iteration.value, max.value)
  })

  watch(iteration, async () => {
    await mandelbrotJs.draw(viewBox, iteration.value, max.value)
  })
})
</script>

<template>
  <main>
    <div class="canvas">
      <canvas class="wasm" ref="canvasWasm" :width="width" :height="height"></canvas>
      <canvas class="js" ref="canvasJs" :width="width" :height="height"></canvas>
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
            <td class="value number">123</td>
          </tr>
          <tr class="js">
            <td class="name">JS</td>
            <td class="value number">56</td>
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
