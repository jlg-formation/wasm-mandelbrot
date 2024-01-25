<script setup lang="ts"></script>

<template>
  <main>
    <div class="canvas">
      <canvas class="wasm"></canvas>
      <canvas class="js"></canvas>
    </div>
    <div class="command">
      <label>
        <span>Iterations</span>
        <input type="range" name="" id="" min="1" max="1000" />
      </label>
      <label>
        <span>Trigger</span>
        <input type="range" name="" id="" min="1" max="1000" />
      </label>
    </div>
    <div class="stats">
      <table>
        <tbody>
          <tr class="wasm">
            <th class="name">WASM</th>
            <td class="value">123</td>
          </tr>
          <tr class="js">
            <th class="name">JS</th>
            <td class="value">56</td>
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
</style>
