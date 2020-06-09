<template>
  <div>
    <Header />
    <div :style="{ 'min-height': '90vh' }">
      <nuxt />
    </div>
    <Footer />
    <client-only>
      <cookie-law v-bind="cookieLawOptions" />
    </client-only>
  </div>
</template>

<script>
import { Header, Footer } from '../components'

export default {
  name: 'DefaultLayout',
  components: { Header, Footer },
  data: () => ({
    cookieLawOptions: {
      theme: 'blood-orange',
      message: 'Ce site utilise des cookies pour vous assurer une meilleure expérience.',
      buttonText: 'Compris'
    }
  }),
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cinzel&family=Nunito&display=swap' }
      ],
      bodyAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  }
}
</script>
