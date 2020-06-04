<template>
  <div>
    <Header />
    <div :style="{ 'min-height': '90vh' }">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import { Header, Footer } from '../components'

export default {
  name: 'DefaultLayout',
  components: { Header, Footer },
  computed: {
    title () {
      return this.$route.name
    }
  },
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cinzel&family=Nunito&display=swap' }
      ],
      bodyAttrs: {
        class: 'has-navbar-fixed-top'
      },
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        // { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>
