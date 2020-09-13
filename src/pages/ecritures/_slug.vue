<template>
  <section class="section">
    <div v-if="!$fetchState.pending">
      <DotLeader class="title">
        <nuxt-link class="is-size-5" :to="localePath({ name: 'ecritures' })">
          écritures
        </nuxt-link>

        <template v-slot:end>
          <h2 class="title is-3 is-hidden-touch">{{ ecriture.name }}</h2>
        </template>
      </DotLeader>

      <div class="columns">
        <div class="column is-full is-two-thirds-desktop">
          <div class="card has-background-white">
            <div class="card-image">
              <figure class="image is-4by3">
                <sanity-image
                  :image="ecriture.image.asset"
                  :alt="ecriture.name"
                  :width="ecriture.image.dimensions.width"
                  :height="ecriture.image.dimensions.height"
                />
              </figure>
            </div>
            <div class="card-content is-hidden-desktop">
              <h2 class="title is-3 has-text-centered">{{ ecriture.name }}</h2>
            </div>
          </div>
        </div>

        <div class="column" style="margin-top: auto;">
          <p class="content">{{ ecriture.description }}</p>
          <ecriture-realisations-gallery :images="realisationsImages" />
          <ecriture-nav :prev="prev" :next="next" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import query from "~/groq/queries/ecriture"

export default {
  name: "EcriturePage",
  async fetch() {
    const { slug } = this.$route.params
    this.ecriture = await this.$sanity.fetch(query, { slug })
  },
  data: () => ({
    ecriture: null,
  }),
  computed: {
    prev() {
      if (!this.ecriture) return null
      const nbEcritures = this.ecriture.ecritures.length
      const currentIndex = this.ecriture.ecritures.findIndex(
        ({ slug }) => slug === this.ecriture.slug
      )
      return this.ecriture.ecritures[
        (currentIndex - 1 + nbEcritures) % nbEcritures
      ]
    },
    next() {
      if (!this.ecriture) return null
      const nbEcritures = this.ecriture.ecritures.length
      const currentIndex = this.ecriture.ecritures.findIndex(
        ({ slug }) => slug === this.ecriture.slug
      )
      return this.ecriture.ecritures[
        (currentIndex + 1 + nbEcritures) % nbEcritures
      ]
    },
    realisationsImages() {
      return this.ecriture && this.ecriture.realisations
        ? this.ecriture.realisations.reduce((acc, cur) => {
            return acc.concat(
              cur.images.map((image) => {
                return {
                  ...image,
                  name: cur.title,
                }
              })
            )
          }, [])
        : []
    },
  },
  head() {
    return {
      title: this.ecriture && `écritures - ${this.ecriture.name}`,
    }
  },
}
</script>
