// 主要做键盘监听事件
// 键盘的弹奏
import store from 'store'
const { Piano } = store.state
import { codeToAudioConfig1 } from './keyCodeMap'
const down = e => {
  // console.log('按下')
  if (!codeToAudioConfig1[e.keyCode]) return
  const el = Piano.phonogram[`${codeToAudioConfig1[e.keyCode]}`].element
  const curpho = Piano.phonogram[`${codeToAudioConfig1[e.keyCode]}`]
  // 重设播放速度
  el.playbackRate = 1
  // 总时长
  // console.log('时长', el.duration * 1000)
  // el.addEventListener('ratechange', e => {
  //   console.log('速度---->', e)
  // })
  // curpho.isPlay = true
  // el.defaultPlaybackRate = 3 // 默认播放速度
  // console.log(el.defaultPlaybackRate)
  // 如果键盘是按压状态，就不重复播放
  if (!curpho.isPressed) {
    // el.load()
    // 修改播放时间为0，达到重复播放
    el.currentTime = 0
    el.play()
    store.commit('Piano/setPress', {
      key: `${codeToAudioConfig1[e.keyCode]}`,
      value: true
    })
  }
  // console.log(Piano.phonogram)
}

const up = e => {
  if (!codeToAudioConfig1[e.keyCode]) return
  const el = Piano.phonogram[`${codeToAudioConfig1[e.keyCode]}`].element
  // console.log('松开了！')
  const { playbackRate, currentTime } = el
  // console.log('当前', el.currentTime * 1000)
  // const curpho = Piano.phonogram[`${codeToAudioConfig1[e.keyCode]}`]
  // 重置按压状态为false
  store.commit('Piano/setPress', {
    key: `${codeToAudioConfig1[e.keyCode]}`,
    value: false
  })
  // 如果剩余时长大于预设延音，加速让其衰减
  if (playbackRate * 1000 - currentTime * 1000 > Piano.voiceDelayed) {
    el.playbackRate =
      (playbackRate * 1000 - currentTime * 1000) / Piano.voiceDelayed
    // console.log('当前倍速', el.playbackRate)
  }
}
document.addEventListener('keydown', down)
document.addEventListener('keyup', up)
