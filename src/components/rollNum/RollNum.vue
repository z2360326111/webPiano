<template>
  <div>
    <input type="text" v-model="orderId" />
    <div class="btns-contain">
      <button @click="wxCreate">微信-生成订单</button>
      <button @click="wxClose">微信-关闭交易</button>
      <button @click="wxCancel">微信-交易撤销</button>
      <button @click="wxQuery">微信-交易查询</button>
    </div>
    <div class="btns-contain">
      <button @click="aliCreate">支付宝-生成订单</button>
      <button @click="aliPayClose">支付宝-关闭交易</button>
    </div>
    <a-upload
      name="avatar"
      class="avatar-uploader"
      :show-upload-list="false"
      :multiple="true"
      action="/"
      :before-upload="beforeUpload"
      :disabled="loading"
    >
      <p>上传图片</p>
      <a-spin size="small" v-if="loading" class="loading" />
    </a-upload>
    <div v-if="resultUrl" class="qr-box">
      <AliQRcode :url="resultUrl" />
    </div>
  </div>
</template>

<script>
import UploadFile from 'utils/uploadImg/upload-to-oss.js'
import QRCode from 'qrcodejs2'
import { goPay, closePay } from 'api/pay.js'
export default {
  data() {
    return {
      blur: 2,
      note: '',
      voice: '',
      orderId: null, // 订单id
      resultUrl: null,
      loading: false
    }
  },
  components: {
    AliQRcode: () =>
      import(/* webpackChunkName: "AliQRcode" */ 'components/Pay/AliQRcode.vue')
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
    },
    // 支付宝-生成订单
    aliCreate() {
      this.resultUrl = null
      const data = {
        outTradeNo: this.orderId
      }
      goPay(data).then(res => {
        if (res.code === 200) {
          this.resultUrl = res.result.qrCode
        }
      })
    },
    // 支付宝-关闭订单
    aliPayClose() {
      const data = {
        tradeNo: this.orderId
      }
      this.resultUrl = null
      closePay(data).then(res => {
        console.log('关闭订单结果', res)
      })
    },
    async beforeUpload(file) {
      // console.log(file, fileList)
      // const a = 1
      // if (a) {
      //   return
      // }
      const img = await new UploadFile({
        file
      })
      img
        .upload_png_image()
        .then(res => {
          // this.$emit('upSuccess', res)
          console.log('上传图片结果', res)
          this.loading = false
        })
        .catch(() => {
          this.$message.warning('上传出错了~~')
          this.loading = false
        })
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
.qr-box {
  width: 150px;
  height: 150px;
}
</style>
