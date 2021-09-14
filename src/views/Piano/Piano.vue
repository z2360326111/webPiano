<template>
  <div class="piano-page" id="piano">
    <!-- 菜单层 -->
    <div class="menu-body"></div>
    <!-- canvas层 -->
    <div class="note-bar">
      <canvas></canvas>
    </div>
    <!-- 键盘层 -->
    <div class="keybord-body">
      <WhiteKey />
    </div>
  </div>
</template>

<script>
import 'utils/keybord.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
    WhiteKey: () =>
      import(
        /* webpackChunkName: "WhiteKey" */ 'components/Piano/Keys/WhiteKey.vue'
      )
  },
  computed: {
    ...mapState({
      phonogram: state => state.Piano.phonogram
    })
  },
  mounted() {
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
    console.log(els)
  },
  methods: {
    keyDowns(e) {
      console.log(e)
    },
    menuClick() {
      alert(111)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './piano.scss';
</style>
