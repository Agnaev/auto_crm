<template>
  <div id="yandex-map"></div>
</template>

<script>
export default {
  name: 'HomeMap',
  created () {
    this.appendScript(
      `https://api-maps.yandex.ru/2.1/?apikey=${process.env.VUE_APP_API_YANDEX_MAPS_API_KEY}&lang=ru_RU`,
      this.initializeYandexMap
    )
  },
  methods: {
    appendScript (src, onLoad) {
      const script = document.createElement('script')
      script.src = src
      document.head.appendChild(script)
      onLoad && script.addEventListener('load', onLoad)
    },
    initializeYandexMap () {
      /* eslint-disable no-undef */
      ymaps.ready(() => {
        const coordinates = [43.054782, 44.666616]
        const map = new ymaps.Map('yandex-map', {
          center: coordinates,
          zoom: 16
        })
        const marker = new ymaps.GeoObject({
          geometry: {
            type: 'Point',
            coordinates
          }
        })
        map.geoObjects.add(marker)
      })
    }
  }
}
</script>

<style scoped>
#yandex-map {
  width: 100%;
  height: 500px;
  margin: 20px 0;
}
</style>
