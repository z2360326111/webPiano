export default {
  namespaced: true,
  state: {
    phonogram: {}, // 音源元素
    voiceDelayed: 500 // 延音时常，毫秒
  },
  mutations: {
    // 设置音频播放器
    setPhonOgram(state, el) {
      state.phonogram = el
    },
    // 修改播放器状态
    setPlayStyle(state, { key, value }) {
      state.phonogram[key].isPlay = value
    },
    // 修改按压状态
    setPress(state, { key, value }) {
      state.phonogram[key].isPressed = value
      // console.log(state.phonogram[key].isPressed)
    }
  }
}
