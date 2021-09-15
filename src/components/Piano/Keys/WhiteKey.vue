<template>
  <div class="white-key">{{ keyInfo.name }}</div>
</template>

<script>
export default {
  props: {
    keyInfo: {
      type: Object,
      default: function() {
        return {
          name: 'B0'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.white-key {
  height: 100%;
  width: calc(100% / 49);
}
</style>
