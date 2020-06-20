import Vue from 'vue'
import { format, parse } from 'date-fns'
import { fr } from 'date-fns/locale'

Vue.mixin({
  methods: {
    openLink (url) { window.open(url) },

    getImagePath (imgUrl) {
      return `${process.env.backendURL === 'http://localhost:1337' ? process.env.backendURL : ''}${imgUrl}`
    },

    getImageProps (img, size) {
      const { url: src, width, height } = img.formats[size]
      return {
        src: `${process.env.backendURL === 'http://localhost:1337' ? process.env.backendURL : ''}${src}`,
        width,
        height
      }
    },

    formatDate (date) {
      return format(parse(date, 'yyyy-MM-dd', new Date()), 'LLLL yyyy', { locale: fr })
    },

    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
})
