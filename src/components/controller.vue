<style scoped>
  .controller {
    padding: 8px;
  }
  .info {
    margin-right: 16px;
    margin-bottom: 8px;
  }
</style>
<template>
  <div class="controller">
    <div class="info"><slot name="info"></slot></div>
    <div class="actions"><slot name="actions"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>
