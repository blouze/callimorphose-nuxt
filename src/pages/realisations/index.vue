<template>
  <div>
    <section class="section">
      <h1 class="title is-2">
        <DotLeader>
          <template v-slot:end>réalisations</template>
        </DotLeader>
      </h1>
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
import { page } from "~/mixins"
import realisationsquery from "~/groq/queries/realisations"

export default {
  name: "RealisationsPage",
  mixins: [page],
  async fetch() {
    this.realisations = await this.$sanity.fetch(realisationsquery)
    return this.fetchPage()
  },
  data: () => ({
    slug: "realisations",
    realisations: [],
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
}
</script>
