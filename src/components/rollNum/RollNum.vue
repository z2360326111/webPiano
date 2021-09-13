<template>
  <div>
    <audio :src="voice" id="real-audio"></audio>
    <input type="text" v-model="note" />
    <button @click="change">切换</button>
    <button @click="stop">暂停</button>
    <ul class="roll-box" :style="{ height: '21px' }">
      <li v-for="item in rollItem" :key="item">{{ item }}</li>
      <li id="roll-li">0</li>
    </ul>
    <div>{{ `1line 1 2333` }}</div>
    <svg>
      <filter id="blur">
        <feGaussianBlur
          in="SoruceGraphic"
          :stdDeviation="`0 ${blur}`"
        ></feGaussianBlur>
      </filter>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blur: 2,
      note: '',
      voice: ''
    }
  },
  props: {
    rollItem: {
      type: Array,
      default: () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    }
  },
  mounted() {
    // console.log(this.acoustic_grand_piano)
    // this.voice = this.acoustic_grand_piano['C1']
    // 预先加载所有资源
    // const players = []
  },
  methods: {
    change() {
      // this.voice = this.acoustic_grand_piano[this.note]
      // const el = document.getElementById('real-audio')
      // el.play()
      this.AudioElements[this.note].play()
    },
    stop() {
      const el = document.getElementById('real-audio')
      el.play()
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.roll-box {
  border: 1px solid #ccc;
  border-radius: 2px;
  width: 100%;
  // height: 20px;
  overflow: hidden;
}
@keyframes move {
  from {
    transform: translateY(-90%);
    filter: url(#blur);
  }
  to {
    transform: translateY(1%);
    filter: url(#blur);
  }
}
@keyframes bounce-in-down {
  from {
    transform: translateY(calc(var(--i) * -9.09% - 7%));
    filter: none;
  }
  25% {
    transform: translateY(calc(var(--i) * -9.09% + 3%));
  }
  50% {
    transform: translateY(calc(var(--i) * -9.09% - 1%));
  }
  70% {
    transform: translateY(calc(var(--i) * -9.09% + 0.6%));
  }
  85% {
    transform: translateY(calc(var(--i) * -9.09% - 0.3%));
  }
  to {
    transform: translateY(calc(var(--i) * -9.09%));
  }
}
@keyframes enhance-bounce-in-down {
  25% {
    transform: translateY(8%);
  }
  50% {
    transform: translateY(-4%);
  }
  70% {
    transform: translateY(2%);
  }
  85% {
    transform: translateY(-1%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
