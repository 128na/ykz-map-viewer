<template>
  <transition name="fade">
    <img
      :src="src"
      :class="{
        resizable: resizable,
      }"
    >
  </transition>
</template>

<script>
export default {
  props: {
    src: String,
    resizable: Boolean,
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .resizable {
    width: 100%;
    max-width: 100%;
    max-height: 100vh;
  }
</style>