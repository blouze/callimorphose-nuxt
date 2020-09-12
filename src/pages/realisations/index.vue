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
      v-for="{ id, title, date, images } in realisations"
      :key="id"
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
              class="gallery-item image"
              @click="setGalleryId(id, imageIndex)"
            >
              <sanity-image
                :image="image.asset"
                :alt="title"
                :width="image.dimensions.width"
                :height="image.dimensions.height"
                :size-factor="0.8"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import query from "~/groq/queries/realisations"

export default {
  name: "RealisationsPage",
  async fetch() {
    this.realisations = await this.$sanity.fetch(query)
  },
  data: () => ({
    realisations: [],
    galleryId: null,
    imageIndex: null,
  }),
  computed: {
    galleryImages() {
      const realisation =
        this.realisations &&
        this.realisations.find((r) => r.id === this.galleryId)

      return (
        realisation &&
        realisation.images.map(
          (image) => this.getImageProps(image, "large").src
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
    }
  },
}
</script>
