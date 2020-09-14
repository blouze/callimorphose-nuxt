import ecrituresQuery from "./src/groq/queries/ecritures"
import sanityClient from "@sanity/client"

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
})

export default {
  srcDir: "src",
  modules: ["nuxt-stack", "nuxt-buefy", "nuxt-fontawesome", "nuxt-i18n"],
  buildModules: ["@nuxtjs/svg"],
  styles: ["styles/index.scss"],
  styleResources: {
    scss: ["styles/theme.scss", "styles/variables.scss"]
  },
  stack: {
    name: "Callimorphose",
    host: "https://callimorphose.com",
    description: "Callimorphose - atelier de calligraphie, Paris",
    keywords: ["Céline Renaudie", "calligraphe", "calligraphie", "atelier"],
    backgroundColor: "#FFFFFF",
    themeColor: "#363636",
    preconnect: [
      "https://fonts.gstatic.com",
    ]
  },
  env: {
    siteName: 'Callimorphose, atelier de calligraphie',
    siteAuthor: 'DISPLAY JERKY',
    emailAdress: process.env.EMAIL_ADRESS || 'bonjour@callimorphose.com',
    instagramURL: process.env.INSTAGRAM_URL || 'https://www.instagram.com/callimorphose',
    videoURL: process.env.VIDEO_URL || 'https://storage.googleapis.com/callimorphose.appspot.com/FREAKSHOW.mp4',
    videoPosterURL: process.env.VIDEO_POSTER_URL || 'https://storage.cloud.google.com/callimorphose.appspot.com/video-poster.jpg',
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  plugins: [
    "plugins/helpers",
    "plugins/sanity.js",
    "plugins/analytics.js",
    { src:"plugins/vue-gallery.js", mode: "client" },
    "plugins/vuelidate.js"
  ],
  components: true,
  pageTransition: {
    name: 'view'
  },
  webfonts: {
    google: {
      families: [
        "Cinzel",
        "Nunito",
      ]
    }
  },
  buefy: {
    css: false,
    materialDesignIcons: false,
    defaultIconPack: 'fas',
    defaultIconComponent: 'font-awesome-icon',
    defaultFieldLabelPosition: 'on-border'
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons', // Solid icons
        icons: [
          'faEnvelope', 'faUser',
          'faExclamationCircle'
        ]
      },
      {
        set: '@fortawesome/free-brands-svg-icons', // Solid icons
        icons: ['faInstagram']
      },
    ]
  },
  i18n: {
    locales: [
      {
        code: 'fr',
        file: 'fr-FR.json',
      },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'lang/',
  },
  axios: {
    baseURL: "/"
  },
  sitemap: {
    hostname: 'https://callimorphose.com',
    exclude: ['/contact/merci'],
    defaults: {
      lastmod: new Date()
    },
    routes: async () => {
      const ecritures = await sanity.fetch(ecrituresQuery)
      return ecritures.map(({ slug }) => `/ecritures/${slug}`)
    }
  },
}
