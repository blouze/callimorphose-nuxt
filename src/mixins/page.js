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
      this.title = this.capitalizeFirstLetter(name)
      this.meta = meta
        .map(({ name, content }) => ({
          hid: name,
          name: name,
          content,
        }))
        .concat(
          meta.map(({ name, content }) => ({
            hid: `og:${name}`,
            name: `og:${name}`,
            content,
          }))
        )
      this.pageBuilder = pageBuilder
    },
  },

  data: () => ({
    query: null,
    slug: null,
    title: null,
    meta: null,
    pageBuilder: [],
  }),

  head() {
    return this.$route.name !== this.localeRoute("index").name
      ? {
          title: this.title,
          titleTemplate: `%s — ${process.env.siteName}`,
          meta: this.meta.concat({
            hid: "og:title",
            name: "og:title",
            content: `${this.title} — ${process.env.siteName}`,
          }),
        }
      : {
          title: process.env.siteName,
          meta: this.meta,
        }
  },
}
