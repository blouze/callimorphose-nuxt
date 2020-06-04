import Vue from 'vue'
import { format, parse } from 'date-fns'
import { fr } from 'date-fns/locale'

Vue.mixin({
  methods: {
    getImagePath (imgUrl) {
      return `${process.env.BACKEND_URL === 'http://localhost:1337' ? process.env.BACKEND_URL : ''}${imgUrl}`
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
