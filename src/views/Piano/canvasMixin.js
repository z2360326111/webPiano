export const canvasMixin = {
  mounted() {
    this.$nextTick(() => {
      const white = document.getElementsByClassName('white')[0]
      this.whiteWH.width = white.clientWidth
      this.whiteWH.height = white.clientHeight
      this.keyTransf()
    })
    window.addEventListener('resize', () => {
      // 改变键盘缩放
      this.keyTransf()
      // 改变canvas尺寸
      this.setCanvsWH()
    })
    // 获取canvas信息
    const canvas = document.getElementById('screen-keys')
    // this.$nextTick(() => {
    //   console.log(canvas.width, canvas.height)
    // })
    const ctx = canvas.getContext('2d')
    this.canvas = canvas
    this.ctx = ctx
    this.setCanvsWH()
  }
}
