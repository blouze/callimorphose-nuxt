import Vue from 'vue'

Vue.mixin({
  methods: {
    getImagePath (imgUrl) {
      return `${process.env.NODE_ENV === 'development' ? process.env.BACKEND_URL : ''}${imgUrl}`
    }
  }
})
