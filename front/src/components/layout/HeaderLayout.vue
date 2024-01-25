<template>
  <header>
    <a href="#">
      <span>Mandelbrot with WASM</span>
    </a>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 3em;
  background: #eee;
  padding: 0 0.5em;
  display: flex;
  align-items: center;

  a {
    text-decoration: inherit;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }

    span {
      font-size: 1.3em;
      font-weight: bold;
    }
  }
}
</style>
