<style scoped>
.map-area {
  position: relative;
}
.map-content {
  position: absolute;
  top:0;
  left:0;
}
header {
  padding: 8px;
}
</style>

<template>
  <div>
    <header>
      <h1>横瀬地峡開発記 マップビューワー</h1>
      <span>マップを年度を追って見れます。</span>
    </header>
    <ykz-controller>
      <span slot="info">{{ currentData }}</span>
      <span slot="actions">
        <sui-button primary @click="autoDec" icon="angle double left"></sui-button>
        <sui-button primary @click="dec" icon="angle left"></sui-button>
        <sui-button primary @click="clear" icon="stop"></sui-button>
        <sui-button primary @click="inc" icon="angle right"></sui-button>
        <sui-button primary @click="autInc" icon="angle double right"></sui-button>
        <sui-button primary @click="toggleResizable">{{ resizeMode }}</sui-button>
      </span>
    </ykz-controller>
    <div class="map-area">
      <div v-for="(map, index) in maps" class="map-content">
        <ykz-map
          v-show="shouldShow(index)"
          :src="map.url"
          :resizable="resizable"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from './api'
export default {
  name: 'app',
  components: {
    ykzMap : require('./components/map.vue'),
    ykzController : require('./components/controller.vue'),
  },
  data() {
    return {
      current : 0,
      interval: 1000,
      timerId : null,
      resizable: true,
      maps: [],
    }
  },
  methods: {
    dec() {
      if (this.current > 0) {
        this.current--
      } else {
        this.clear()
      }
    },
    inc() {
      if (this.current < this.maps.length - 1) {
        this.current++
      } else {
        this.clear()
      }
    },
    autoDec() {
      if (!this.timerId) {
        this.timer(this.dec)
      }
    },
    autInc() {
      if (!this.timerId) {
        this.timer(this.inc)
      }
    },
    timer(func) {
      this.timerId = setInterval(func, this.interval)
    },
    clear() {
      clearInterval(this.timerId)
      this.timerId = null
    },
    toggleResizable() {
      this.resizable = !this.resizable
    },
    // 指定画像と1つ前の画像のみを表示する
    shouldShow(index) {
      return index === this.current || index === this.current - 1
    }
  },
  computed: {
    resizeMode() {
      return this.resizable ? '画面幅に合わせる' : '等倍表示'
    },
    currentData() {
      const map = this.maps[this.current]
      if (map) {
        return `No.${this.current}. ${map.year}年`
      }
    }
  },
  created() {
    Promise.resolve()
      .then(() => api.fetch())
      .then(res => {
        this.maps = res.data
      })
  }
}
</script>