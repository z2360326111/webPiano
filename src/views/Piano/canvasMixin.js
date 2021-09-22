export const canvasMixin = {
  data() {
    return {
      rhythmTime: 120, // 节拍，每分钟多少下
      rhythm: [4, 4], // 拍子
      mus: [
        {
          name: '',
          brief: 1,
          anyRhy: 1,
          th: 8
        }
      ]
    }
  },
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
    this.h5Api()
  },
  methods: {
    h5Api() {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioContext()
      // 音量控制
      const gainNode = ctx.createGain()
      // 音色
      const osT = ctx.createOscillator()
      osT.connect(gainNode)
      osT.type = 'sin'
      osT.frequency.value = 150.0
      gainNode.connect(ctx.destination)
      gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.01)
      gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01)

      osT.start(ctx.currentTime)
      osT.stop(ctx.currentTime + 1)
    },
    /**
     *
     * @param {Number} brief 到了第几小结
     * @param {Number} anyRhy 到了第几拍
     * @param {Number} th 几分音符
     */
    computTime(brief, anyRhy, th) {
      // 由于这个curentime是一个固定值，所以每一个的时值，都是往后累加
      let start
      let end
      const theTHTime = this.rhythmTime / 60 // 每一个小节多少秒
      const theRhtTime = theTHTime / this.rhythm[1] // 每一拍的时值
      start = (brief - 1) * theTHTime + (anyRhy - 1) * theRhtTime
      end = start + (this.rhythm[0] / th) * theRhtTime
      return {
        start,
        end
      }
    }
  }
}
