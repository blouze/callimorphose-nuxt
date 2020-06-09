<template>
  <div v-if="$apollo.loading">
    <Loader />
  </div>

  <div v-else>
    <section class="section" />

    <section class="section hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-3">
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
        <div class="columns is-multiline">
          <div
            v-for="({id: imageId, formats}, imageIndex) in images"
            :key="imageId"
            class="column is-6"
          >
            <figure class="gallery-item image" @click="setGalleryId(id, imageIndex)">
              <img :src="getImagePath(formats['medium'].url)">
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
import { Loader, DotLeader } from '~/components'

export default {
  name: 'RealisationsPage',
  components: { Loader, DotLeader },
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
      return realisation && realisation.images.map(image => this.getImagePath(image.formats.large.url))
    }
  },
  methods: {
    setGalleryId (id, index) {
      this.galleryId = id
      this.imageIndex = index
    }
  },
  head () {
    return {
      title: 'réalisations | Callimorphose',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description-realisations',
          name: 'description',
          content: `
            Réalisations - consultez en un coup d'oeil les travaux de calligraphie réalisés par l'atelier Callimorphose.
          `
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.gallery-item
  cursor: pointer
</style>
