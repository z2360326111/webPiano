<template>
  <div>{{ keyInfo.name }}</div>
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

<style lang="scss" scoped></style>
