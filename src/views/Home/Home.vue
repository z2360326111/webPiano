<template>
  <div class="home">
    <h1>martech-web</h1>
    <div class="scroll-contaiin">
      <RollNum />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    RollNum: () =>
      import(
        /* webpackChunkName: "StyleDetail" */ 'components/rollNum/RollNum.vue'
      )
  }
}
</script>
<style>
@import url(./home.scss);
</style>
