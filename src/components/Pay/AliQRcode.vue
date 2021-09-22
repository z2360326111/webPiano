<template>
  <div id="result">
    <div class="pay-logo">
      <img :src="payLogo" alt="" />
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      payLogo: require('assets/pay-logo.png')
    }
  },
  props: {
    url: {
      type: String
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createQRCode()
    })
  },
  methods: {
    createQRCode() {
      const el = document.getElementById('result')
      if (this.url && el) {
        const qrcode = new QRCode(el, {
          text: '支付宝付款',
          width: 150,
          height: 150,
          colorDark: '#000',
          colorLight: '#fff',
          correctLevel: QRCode.CorrectLevel.L // 二维码样式
        })
        qrcode.clear()
        qrcode.makeCode(this.url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#result {
  position: relative;
  .pay-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0px);
  }
}
</style>
