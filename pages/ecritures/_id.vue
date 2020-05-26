<template>
  <div>
    <section class="section" />

    <section class="section">
      <div class="container">
        <div class="tile is-ancestor">
          <div class="tile is-8">
            <figure class="image">
              <img :src="`http://localhost:1337${image}`">
            </figure>
          </div>
          <div class="tile is-parent is-vertical is-4">
            <div class="tile is-child notification is-white">
              <h2 class="title is-2 has-text-centered is-block">
                {{ name }}
              </h2>
              <p class="has-text-justified">
                {{ description }}
              </p>
            </div>
            <div class="tile columns is-multiline is-gapless">
              <div
                v-for="({ id, title, images }, imageIndex) in realisations"
                :key="id"
                class="gallery-item column is-half"
                @click="index = imageIndex"
              >
                <figure class="image">
                  <img :src="`http://localhost:1337${images[0].formats.thumbnail.url}`" :alt="title">
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <client-only>
      <v-gallery
        :images="images || []"
        :index="index"
        @close="index = null"
      />
    </client-only>
  </div>
</template>

<script>
import ecritureQuery from '~/apollo/queries/ecriture/ecriture'

export default {
  name: 'EcritureDetails',
  apollo: {
    ecriture: {
      prefetch: true,
      query: ecritureQuery,
      variables () { return { id: this.$route.params.id } }
    }
  },
  data: () => ({ index: null }),
  computed: {
    name () { return this.ecriture && this.ecriture.name },
    image () { return this.ecriture && this.ecriture.image.formats.large.url },
    description () { return this.ecriture && this.ecriture.description },
    realisations () { return this.ecriture && this.ecriture.realisations },
    images () {
      return this.realisations && this.realisations.map(realisation => `http://localhost:1337${realisation.images[0].formats.large.url}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.gallery-item
  cursor: pointer
</style>
