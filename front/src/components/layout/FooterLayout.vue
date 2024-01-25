<template>
  <footer>
    <a href="#"> Legal </a>
    <a href="#">Github</a>
  </footer>
</template>

<style scoped lang="scss">
footer {
  height: 3em;
  background: #eee;
  padding: 0 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-around;

  a {
    text-decoration: inherit;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
