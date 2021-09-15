<template>
  <div class="piano-page" id="piano">
    <!-- 菜单层 -->
    <div class="menu-body">
      <button @click="aliPay">支付20</button>
      <div id="result"></div>
    </div>
    <!-- canvas层 -->
    <div class="note-bar">
      <canvas></canvas>
    </div>
    <!-- 键盘层 -->
    <div class="keybord-body">
      <!-- <WhiteKey v-if="false" /> -->
      <div
        v-for="(item, index) in whiteKeys"
        :key="index"
        class="white-key"
        @mousedown="hitKey(item)"
      >
        <!-- <BlackKey :keyInfo="{ name: item }" /> -->
        <div class="key-bg" :class="getIsPress(item) ? 'pressAct' : ''"></div>
        <div class="voice-name">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import 'utils/keybord.js'
import { keysOrder } from 'utils/keyCodeMap'
import { mapState } from 'vuex'
import { goPay } from 'api/pay.js'
export default {
  data() {
    return {
      whiteKeys: []
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
      phonogram: state => state.Piano.phonogram
    })
  },
  mounted() {
    this.whiteKeys = keysOrder
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
    aliPay() {
      const data = {
        orderId: 'a-12-c4'
      }
      goPay(data).then(res => {
        const el = document.getElementById('result')
        el.innerHTML = res.result
      })
    },
    // 鼠标按下按键
    hitKey(curKey) {
      const el = this.phonogram[curKey]
      el.element.play()
    },
    // 获取每一个按键是否是被按压的状态
    getIsPress(curKey) {
      let res = this.phonogram[curKey].isPressed || false
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
@import './piano.scss';
</style>
