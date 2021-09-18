<template>
  <div class="piano-page" id="piano">
    <!-- 菜单层 -->
    <div class="menu-body">
      <button @click="aliPay">支付20</button>
      <button @click="getCurBody">关闭当前订单</button>
      <input type="text" v-model="orderId" />
      <button @click="nonePiano">搜索</button>
      <div id="result">
        <div class="pay-logo">
          <img :src="payLogo" alt="" />
        </div>
      </div>
    </div>
    <!-- canvas层 -->
    <div
      class="note-bar"
      :style="{
        height: `calc(100% - ${borderScale * whiteWH.height}px)`
      }"
    >
      <canvas id="screen-keys"></canvas>
    </div>
    <!-- 键盘层 -->
    <div
      class="keybord-body"
      :style="{
        transform: `scale(${borderScale})`
      }"
      v-show="showPiano"
    >
      <!-- 白键，不用布局和定位 -->
      <div class="white">
        <div
          v-for="item in whiteKeys"
          :key="item"
          class="white-key"
          @mousedown="hitKey(item)"
          @mouseup="cacelKey(item)"
          :ref="`white-key-${item}`"
        >
          <!-- <BlackKey :keyInfo="{ name: item }" /> -->
          <div class="key-bg" :class="getIsPress(item) ? 'pressAct' : ''"></div>
          <div class="voice-name">{{ item }}</div>
        </div>
      </div>
      <!-- 黑键，相对于某些白键做定位 -->
      <div class="black">
        <div
          v-for="bKey in blackKeys"
          :key="bKey"
          class="black-key"
          :style="{
            left: `${getBlackLeft(bKey) || 0}px`
          }"
          @mousedown="hitKey(bKey)"
          @mouseup="cacelKey(bKey)"
        >
          <div class="key-bg" :class="getIsPress(bKey) ? 'pressAct' : ''"></div>
          <div class="voice-name">{{ bKey }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'utils/piano/keybord.js'
import QRCode from 'qrcodejs2'
import { mapState } from 'vuex'

import { canvasMixin } from './canvasMixin.js'
import { drawRect } from 'utils/piano/canvasMode.js'
import { keysOrder, blackKeys } from 'utils/piano/keyCodeMap'
import { goPay, closePay } from 'api/pay.js'
export default {
  mixins: [canvasMixin],
  data() {
    return {
      whiteKeys: [],
      blackKeys: [],
      borderScale: 1, // 键盘缩放比例
      showPiano: true,
      orderId: null,
      payDress: '',
      payLogo: require('assets/pay-logo.png'),
      whiteWH: {
        width: 0,
        height: 0
      },
      canvas: null,
      ctx: null // canvas上下文
    }
  },
  components: {
    // WhiteKey: () =>
    //   import(
    //     /* webpackChunkName: "WhiteKey" */ 'components/Piano/Keys/WhiteKey.vue'
    //   ),
    // BlackKey: () =>
    //   import(
    //     /* webpackChunkName: "BlackKey" */ 'components/Piano/Keys/BlackKey.vue'
    //   )
  },
  computed: {
    ...mapState({
      phonogram: state => state.Piano.phonogram,
      voiceDelayed: state => state.Piano.voiceDelayed
    })
  },
  mounted() {
    this.whiteKeys = keysOrder
    this.blackKeys = blackKeys
    const els = {}
    // 给每一个音创造一个播放器
    const notes = Object.keys(this.acoustic_grand_piano)
    notes.forEach(item => {
      els[`${item}`] = {
        element: new Audio(this.acoustic_grand_piano[item]),
        isPlay: false, // 当前是否正在播放
        isPressed: false // 当前是否是按压状态
      }
    })
    this.$store.commit('Piano/setPhonOgram', els)
    this.AudioElements = els
    // console.log(els)
  },
  methods: {
    nonePiano() {
      this.showPiano = !this.showPiano
    },
    // 生成订单
    aliPay() {
      const data = {
        outTradeNo: this.orderId
      }
      goPay(data).then(res => {
        const el = document.getElementById('result')
        // const aEl = document.createElement('a')
        // aEl.href = res.result
        // aEl.innerHTML = '去支付'
        // // el.innerHTML = aEl
        // el.appendChild(aEl)
        console.log(res.result)
        // window.open(res.result, '_blank', 'top=200')
        if (res.code === 200) {
          this.payDress = res.result
          // eslint-disable-next-line no-undef
          // new QRCode(el, res.result.qrCode)
          const qrcode = new QRCode(el, {
            text: res.result.qrCode,
            width: 150,
            height: 150,
            colorDark: '#000',
            colorLight: '#fff',
            correctLevel: QRCode.CorrectLevel.L
          })
          console.log(qrcode)
          qrcode.clear()
          qrcode.makeCode(res.result.qrCode)
        }
      })
    },
    // 关闭当前订单
    aliPayClose() {
      const data = {
        tradeNo: this.orderId
      }
      closePay(data).then(res => {
        console.log('关闭订单结果', res)
      })
    },
    // 鼠标按下按键
    hitKey(curKey) {
      const el = this.phonogram[curKey]
      // this.canvas.width = 600
      console.log(this.canvas.width, this.canvas.height)
      drawRect(this.ctx, { x: 10, y: 10, w: 10, h: 30 })
      if (!el.isPressed) {
        el.element.playbackRate = 1 // 播放速度
        el.element.currentTime = 0
        el.element.play()
        this.$store.commit('Piano/setPress', {
          key: curKey,
          value: true
        })
      }
      // el.isPressed = true
    },
    // 鼠标抬起
    cacelKey(curKey) {
      const el = this.phonogram[curKey]
      const { playbackRate, currentTime } = el.element
      this.$store.commit('Piano/setPress', {
        key: curKey,
        value: false
      })
      if (playbackRate * 1000 - currentTime * 1000 > this.voiceDelayed) {
        el.element.playbackRate =
          (playbackRate * 1000 - currentTime * 1000) / this.voiceDelayed
      }
    },
    // 获取每一个按键是否是被按压的状态
    getIsPress(curKey) {
      let res = this.phonogram[curKey].isPressed || false
      return res
    },
    // 获取当前窗口
    getCurBody() {
      const curBody = document.getElementsByTagName('body')[0]
      return curBody.clientWidth
    },
    // 修改当前缩放比例
    keyTransf() {
      const transf = this.getCurBody() / this.whiteWH.width
      this.borderScale = transf
    },
    // 计算当前黑键偏移量
    getBlackLeft(curKey) {
      const whiteName = curKey.replace('b', '')
      const width = this.getRefsDomLeft(`white-key-${whiteName}`)
      return width
    },
    // 获取ref得left位置
    getRefsDomLeft(ref) {
      const el = this.$refs[ref]
      if (el) {
        return el[0].offsetLeft - 40
      }
      return 0
    },
    // 设置canvas的宽高
    setCanvsWH() {
      const el = document.getElementsByClassName('note-bar')
      if (el && this.canvas) {
        this.canvas.height = el[0].clientHeight
        this.canvas.width = el[0].clientWidth
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './piano.scss';
</style>
