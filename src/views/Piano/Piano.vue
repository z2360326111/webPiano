<template>
  <div class="piano-page" id="piano">
    <!-- 菜单层 -->
    <div></div>
    <!-- canvas层 -->
    <div class="note-bar">
      <canvas width="100%" height="100%"></canvas>
    </div>
    <!-- 键盘层 -->
    <div></div>
  </div>
</template>

<script>
import 'utils/keybord.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
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
        isPlay: false,
        isPressed: false
      }
    })
    this.$store.commit('Piano/setPhonOgram', els)
    this.AudioElements = els
    console.log(els)
  },
  methods: {
    keyDowns(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(./piano.scss);
</style>
