export default {
  srcDir: "src",
  modules: ["nuxt-stack", "nuxt-buefy", "nuxt-fontawesome"],
  styles: ["styles/index.scss"],
  styleResources: {
    scss: ["styles/theme.scss", "styles/variables.scss"]
  },
  stack: {
    name: "Callimorphose",
    host: "https://callimorphose.com",
    description: "Callimorphose - atelier de calligraphie, Paris",
    keywords: ["Céline Renaudie", "calligraphie", "calligraphe", "atelier"],
    backgroundColor: "#FFFFFF",
    themeColor: "#363636",
    preconnect: [
      "https://fonts.gstatic.com",
      "https://fonts.googleapis.com",
      "https://cdn.jsdelivr.net"
    ]
  },
  env: {
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : 'https://callimorphose.com',
    siteName: 'Callimorphose',
    siteAuthor: 'DISPLAY JERKY',
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
  plugins: [
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
    ]
  },
}
