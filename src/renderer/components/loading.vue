<template>
  <div class="cpt-loading">
    <div class="loader">
      <span v-for="i in 3" :key="i" :style="dotSize"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 14
    }
  },

  computed: {
    dotSize () {
      const size = `${this.size}px`
      return {
        width: size,
        height: size
      }
    }
  }
}
</script>

<style lang="scss">
.cpt-loading {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  .loader {
    width: 100%;
    text-align: center;

    span {
      position: absolute;
      display: inline-block;
      border-radius: 50%;
      animation: 3s infinite linear;

      &:nth-child(1) {
        background: #01a2a6;
        animation: kiri 1.2s infinite linear;
      }
      &:nth-child(2) {
        z-index: 100;
        background: #29d9c2;
      }
      &:nth-child(3) {
        background: #bdf271;
        animation: kanan 1.2s infinite linear;
      }
    }
  }
}

@keyframes kanan {
  0% {
    transform: translateX(20px);
  }

  50% {
    transform: translateX(-20px);
  }

  100% {
    z-index: 200;

    transform: translateX(20px);
  }
}

@keyframes kiri {
  0% {
    z-index: 200;

    transform: translateX(-20px);
  }
  50% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(-20px);
  }
}
</style>
