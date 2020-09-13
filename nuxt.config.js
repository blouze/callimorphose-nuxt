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
      "https://fonts.googleapis.com",
      "https://cdn.jsdelivr.net"
    ]
  },
  env: {
    baseURL: process.env.NODE_ENV !== 'production' ? process.env.DEPLOY_PRIME_URL : process.env.URL,
    siteName: 'Callimorphose, atelier de calligraphie',
    siteAuthor: 'DISPLAY JERKY',
    emailAdress: process.env.EMAIL_ADRESS || 'bonjour@callimorphose.com',
    instagramURL: process.env.INSTAGRAM_URL || 'https://www.instagram.com/callimorphose',
    videoURL: process.env.VIDEO_URL || 'https://storage.googleapis.com/callimorphose.appspot.com/FREAKSHOW.mp4',
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  plugins: [
    "plugins/helpers",
    "plugins/sanity.js",
    "plugins/analytics.js",
    // "plugins/vue-zoomer.js",
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
  axios: {}
}
