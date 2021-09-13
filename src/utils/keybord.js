// 主要做键盘监听事件
import store from 'store'
const { Piano } = store.state
import { codeToAudioConfig1 } from './keyCodeMap'
const down = e => {
  console.log('按下')
  if (!codeToAudioConfig1[e.keyCode]) return
  const el = Piano.phonogram[`${codeToAudioConfig1[e.keyCode]}`].element
  const curpho = Piano.phonogram[`${codeToAudioConfig1[e.keyCode]}`]
  // curpho.isPlay = true
  // el.defaultPlaybackRate = 3 // 默认播放速度
  // console.log(el.defaultPlaybackRate)
  // 如果键盘是按压状态，就不重复播放
  if (!curpho.isPressed) {
    el.load()
    el.play()
    store.commit('Piano/setPress', {
      key: `${codeToAudioConfig1[e.keyCode]}`,
      value: true
    })
  }
  // console.log(Piano.phonogram)
}

const up = e => {
  console.log('松开了！')
  if (!codeToAudioConfig1[e.keyCode]) return
  const curpho = Piano.phonogram[`${codeToAudioConfig1[e.keyCode]}`]
  // 重置按压状态为false
  store.commit('Piano/setPress', {
    key: `${codeToAudioConfig1[e.keyCode]}`,
    value: false
  })
  setTimeout(() => {
    // 如果是处于松开状体，则开启衰减
    if (!curpho.isPressed) {
      Piano.phonogram[`${codeToAudioConfig1[e.keyCode]}`].element.load()
    }
  }, Piano.voiceDelayed)
}
document.addEventListener('keydown', down)
document.addEventListener('keyup', up)
