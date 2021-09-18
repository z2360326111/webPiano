<template>
  <div>
    <input type="text" v-model="orderId" />
    <div class="btns-contain">
      <button @click="wxCreate">微信-生成订单</button>
      <button @click="wxClose">微信-关闭交易</button>
      <button @click="wxCancel">微信-交易撤销</button>
      <button @click="wxQuery">微信-交易查询</button>
    </div>
    <div id="result"></div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      blur: 2,
      note: '',
      voice: '',
      orderId: null // 订单id
    }
  },
  props: {
    rollItem: {
      type: Array,
      default: () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    }
  },
  mounted() {
    // console.log(this.acoustic_grand_piano)
    // this.voice = this.acoustic_grand_piano['C1']
    // 预先加载所有资源
    // const players = []
  },
  methods: {
    change() {
      // this.voice = this.acoustic_grand_piano[this.note]
      // const el = document.getElementById('real-audio')
      // el.play()
      this.AudioElements[this.note].play()
    },
    stop() {
      const el = document.getElementById('real-audio')
      el.play()
    },
    // 微信-生成订单
    wxCreate() {},
    // 微信-关闭交易
    wxClose() {},
    // 微信-交易撤销
    wxCancel() {},
    // 微信-交易查询
    wxQuery() {},
    // 生成二维码
    createQrcode(url) {
      const el = document.getElementById('result')
      const qrcode = new QRCode(el, {
        text: '微信支付',
        width: 150,
        height: 150,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.L
      })
      // console.log(qrcode)
      qrcode.clear()
      qrcode.makeCode(url)
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.btns-contain {
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
