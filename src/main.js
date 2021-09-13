import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
window.MIDI
  ? (Vue.prototype.acoustic_grand_piano =
      window.MIDI.Soundfont.acoustic_grand_piano)
  : ''
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import { Button, Icon, message } from 'ant-design-vue'
import './mock'

Vue.use(Button).use(Icon)

Vue.prototype.$message = message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
