import { createApolloFetch } from 'apollo-fetch'
require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/css/main.scss', lang: 'scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/helpers' },
    { src: '~plugins/vuelidate' },
    { src: '~plugins/vue-gallery.client.js' },
    { src: '~plugins/v-body-scroll-lock.client.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
    ['@nuxtjs/google-analytics', {
      id: 'UA-51815367-6',
      dev: false
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/svg'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${process.env.BACKEND_URL || 'http://localhost:1337'}/graphql`
      }
    },
    includeNodeModules: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  fontawesome: {
    icons: {
      solid: ['faEnvelope', 'faExclamationTriangle'],
      brands: ['faInstagram']
    }
  },
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    babel: {
      presets ({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    }
  },
  generate: {
    routes () {
      const uri = `${process.env.BACKEND_URL || 'http://localhost:1337'}/graphql`
      const apolloFetch = createApolloFetch({ uri })
      const query = `query Ecritures {
        ecritures {
          id, slug
        }
      }`
      return apolloFetch({ query }).then(({ data }) => {
        return data.ecritures.map(ecriture => `ecritures/${ecriture.slug}`)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
