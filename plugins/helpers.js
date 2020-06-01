import Vue from 'vue'
import { format, parse } from 'date-fns'
import { fr } from 'date-fns/locale'

Vue.mixin({
  methods: {
    getImagePath (imgUrl) {
      return `${process.env.NODE_ENV === 'development' ? process.env.BACKEND_URL : ''}${imgUrl}`
    },
    formatDate (date) {
      return format(parse(date, 'yyyy-MM-dd', new Date()), 'LLLL yyyy', { locale: fr })
    }
  }
})
