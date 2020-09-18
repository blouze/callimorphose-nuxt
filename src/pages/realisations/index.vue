<template>
  <div>
    <section class="section">
      <h2 class="title is-2">
        <DotLeader>
          <template v-slot:end>réalisations</template>
        </DotLeader>
      </h2>
    </section>

    <section
      v-for="{ _id, title, date, images } in realisations"
      :key="_id"
      class="section"
    >
      <div class="container">
        <h3 class="title is-4">
          <DotLeader>
            {{ title }}
            <template v-slot:end>
              <span class="subtitle">
                {{ formatDate(date) }}
              </span>
            </template>
          </DotLeader>
        </h3>
        <div class="columns is-multiline is-variable is-5-desktop">
          <div
            v-for="(image, imageIndex) in images"
            :key="image.id"
            class="column is-6"
          >
            <figure
              class="clickable image"
              @click="setGalleryId(_id, imageIndex)"
            >
              <sanity-image
                :image="image.asset"
                :alt="title"
                :width="image.dimensions.width"
                :height="image.dimensions.height"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <client-only>
      <v-gallery
        :images="galleryImages || []"
        :index="imageIndex"
        @close="setGalleryId(null, null)"
      />
    </client-only>
  </div>
</template>

<script>
import query from "~/groq/queries/realisations"
import pageQuery from "~/groq/queries/page"

export default {
  name: "RealisationsPage",
  async fetch() {
    this.realisations = await this.$sanity.fetch(query)
    const { slug, meta } = await this.$sanity.fetch(pageQuery, {
      slug: "realisations",
    })
    this.meta = meta.map(({ name, content }) => ({
      hid: `${name}-${slug}`,
      name: name,
      content,
    }))
  },
  data: () => ({
    realisations: [],
    meta: [],
    galleryId: null,
    imageIndex: null,
  }),
  computed: {
    galleryImages() {
      const realisation =
        this.realisations &&
        this.realisations.find((r) => r._id === this.galleryId)

      return (
        realisation &&
        realisation.images.map((image) =>
          this.$imgBuilder.image(image).width(1024).url()
        )
      )
    },
  },
  methods: {
    setGalleryId(id, index) {
      this.galleryId = id
      this.imageIndex = index
    },
  },
  head() {
    return {
      title: "réalisations",
      meta: this.meta,
    }
  },
}
</script>
