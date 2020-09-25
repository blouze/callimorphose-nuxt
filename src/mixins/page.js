import query from "~/groq/queries/page"

export default {
  async fetch() {
    return this.fetchPage()
  },

  methods: {
    async fetchPage() {
      const { name, meta, pageBuilder } = await this.$sanity.fetch(query, {
        slug: this.slug,
      })
      if (this.$route.name !== this.localeRoute("index").name) {
        this.title = this.capitalizeFirstLetter(name)
      }
      this.meta = meta.map(({ name, content }) => ({
        hid: name,
        name: name,
        content,
      }))
      this.pageBuilder = pageBuilder
    },
  },

  data: () => ({
    query: null,
    slug: null,
    title: process.env.siteName,
    meta: null,
    pageBuilder: [],
  }),

  head() {
    return {
      title: this.title,
      meta: this.meta,
    }
  },
}
