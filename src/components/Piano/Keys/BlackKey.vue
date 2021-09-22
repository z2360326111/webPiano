<template>
  <div>{{ keyInfo.name }}</div>
</template>

<script>
export default {
  props: {
    keyInfo: Object,
    default: {
      name: 'B0'
    }
  }
}
</script>

<style lang="scss" scoped></style>
