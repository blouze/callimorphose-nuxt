import Vue from "vue"
import { format, parse } from "date-fns"
import { fr } from "date-fns/locale"

Vue.mixin({
  methods: {
    openLink(url) {
      window.open(url)
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },

    getImageUrl(img, size) {
      const { url } = img.formats[size]
      return `${
        process.env.backendURL === "http://localhost:1337"
          ? process.env.backendURL
          : ""
      }${url}`
    },

    getImageProps(img, size, options = {}) {
      const { url: src, width, height } = img.formats[size]
      const { lazy } = options
      const props = { width, height }
      if (!lazy) {
        props.src = `${
          process.env.backendURL === "http://localhost:1337"
            ? process.env.backendURL
            : ""
        }${src}`
      }
      return props
    },

    formatDate(date) {
      return format(parse(date, "yyyy-MM-dd", new Date()), "LLLL yyyy", {
        locale: fr,
      })
    },
  },
})
