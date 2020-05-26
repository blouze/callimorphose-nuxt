<template>
  <div>
    <section class="section" />

    <section class="section hero ">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            réalisations
          </h1>
          <h2 class="subtitle">
            <!-- Primary subtitle -->
          </h2>
        </div>
      </div>
    </section>

    <section v-for="{id, title, date, images} in realisations" :key="id" class="section">
      <div class="container">
        <h3 class="title is-3">
          {{ title }}
        </h3>
        <div class="tile is-ancestor">
          <div
            v-for="({id: imageId, formats}, imageIndex) in images"
            :key="imageId"
            class="gallery-item tile is-child"
            :class="{ 'is-8': imageIndex % 3 === 0, 'is-4': imageIndex % 3 !== 0 }"
            @click="setGalleryId(id, imageIndex)"
          >
            <figure class="image is-4by3">
              <img :src="`http://localhost:1337${formats['medium'].url}`">
            </figure>
          </div>
        </div>
      </div>
    </section>

    <client-only>
      <v-gallery
        :images="galleryImages || []"
        :index="imageIndex"
        @close="imageIndex = null"
      />
    </client-only>
  </div>
</template>

<script>
import realisationsQuery from '~/apollo/queries/realisation/realisations'

export default {
  name: 'RealisationsPage',
  apollo: {
    realisations: {
      prefetch: true,
      query: realisationsQuery
    }
  },
  data: () => ({ galleryId: null, imageIndex: null }),
  computed: {
    galleryImages () {
      const realisation = this.realisations && this.realisations.find(r => r.id === this.galleryId)
      return realisation && realisation.images.map(image => `http://localhost:1337${image.formats.large.url}`)
    }
  },
  methods: {
    setGalleryId (id, index) {
      this.galleryId = id
      this.imageIndex = index
    }
  }
}
</script>

<style lang="stylus" scoped>
.gallery-item
  cursor: pointer
</style>
