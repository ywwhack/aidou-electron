<template>
  <div class="cpt-empty">
    <img v-if="mod === 'add'" src="../assets/no-data.png">
    <img v-else src="../assets/empty-icon.png">
  </div>
</template>

<script>
export default {
  props: {
    mod: String
  }
}
</script>

<style lang="scss">
.cpt-empty {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  & > img {
    margin: 0 auto;
  }
}
</style>
