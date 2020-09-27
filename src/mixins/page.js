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
    if (this.$route.name === this.localeRoute("index").name) {
      return {
        title: process.env.siteName,
        meta:
          this.meta &&
          this.meta.concat([
            {
              hid: "og:image",
              name: "og:image",
              content: process.env.siteLogo,
            },
            {
              hid: "og:image:width",
              name: "og:image:width",
              content: 1201,
            },
            {
              hid: "og:image:height",
              name: "og:image:height",
              content: 612,
            },
          ]),
      }
    } else {
      return {
        title: this.title,
        titleTemplate: `%s — ${process.env.siteName}`,
        meta:
          this.meta &&
          this.meta.concat([
            {
              hid: "og:title",
              name: "og:title",
              content: `${this.title} — ${process.env.siteName}`,
            },
          ]),
      }
    }
  },
}
