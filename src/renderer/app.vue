<template>
  <section id="app">
    <app-header></app-header>
    <div class="main">
      <transition name="panels" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
import AppHeader from '@/components/app-header'

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 50px 40px 60px;
  background: #fff;
  color: #3e5165;
  font-weight: 200;

  .main {
    flex: 1;
    overflow: hidden;
  }

  .panels-enter-active,
  .panels-leave-active {
    transition: opacity .2s, transform .2s;
  }
  .panels-enter,
  .panels-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
