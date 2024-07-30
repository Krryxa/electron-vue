<script setup lang="ts">
const closeWin = () => {
  window.electronAPI.closeChildWin()
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a href="javascript:;" @click="closeWin">Back to Home</a>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
