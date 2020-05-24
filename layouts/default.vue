<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import { Header, Footer } from '../components'

export default {
  name: 'DefaultLayout',
  components: { Header, Footer },
  head () {
    return {
      bodyAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  }
}
</script>
