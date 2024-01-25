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
