<template>
  <div>
    <section class="section" />

    <section class="section">
      <div class="container">
        <div class="tile is-ancestor">
          <div class="tile is-8 is-parent">
            <figure v-if="image" class="image gallery-item" @click="index = imgs.length - 1">
              <img :src="getImagePath(image)">
            </figure>
          </div>
          <div class="tile is-vertical is-4 is-parent">
            <div class="tile is-child">
              <h2 class="title is-2 has-text-centered">
                {{ name }}
              </h2>
              <p class="has-text-justified">
                {{ description }}
              </p>
            </div>
            <div class="tile columns is-multiline">
              <div
                v-for="({ id, title, images }, imageIndex) in realisations"
                :key="id"
                class="column is-half"
              >
                <figure v-if="images" class="image gallery-item" @click="index = imageIndex">
                  <img :src="getImagePath(images[0].formats.medium.url)" :alt="title">
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <client-only>
      <v-gallery
        :images="imgs ? imgs.map(img => getImagePath(img)) : []"
        :index="index"
        @close="index = null"
      />
    </client-only>
  </div>
</template>

<script>
import ecritureQuery from '~/apollo/queries/ecriture/ecriture'

export default {
  name: 'EcritureDetailsPage',
  apollo: {
    ecriture: {
      prefetch: true,
      query: ecritureQuery,
      variables () { return { slug: this.$route.params.slug } },
      update ({ ecritures }) { return ecritures && ecritures[0] }
    }
  },
  data: () => ({ index: null }),
  computed: {
    name () { return this.ecriture && this.ecriture.name },
    image () { return this.ecriture && this.ecriture.image && this.ecriture.image.formats.large.url },
    description () { return this.ecriture && this.ecriture.description },
    realisations () { return this.ecriture && this.ecriture.realisations },
    imgs () {
      return this.realisations && this.realisations.map(realisation => realisation.images[0].formats.large.url).concat(this.image)
    }
  },
  head () {
    return {
      title: this.name && `${this.name.toUpperCase()} | écritures | Callimorphose`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        // { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.gallery-item
  cursor: pointer
</style>
