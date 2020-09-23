<template>
  <section class="section">
    <div v-if="!$fetchState.pending">
      <DotLeader class="title">
        <nuxt-link class="is-size-5" :to="localePath({ name: 'ecritures' })">
          écritures
        </nuxt-link>

        <template v-slot:end>
          <h1 class="title is-3 is-hidden-touch">{{ ecriture.name }}</h1>
        </template>
      </DotLeader>

      <div class="columns">
        <div class="column is-full is-three-fifths-desktop">
          <div class="card has-background-white-ter">
            <div class="card-image">
              <figure
                class="clickable image is-4by3"
                @click="(index) => (galleryIndex = 0)"
              >
                <sanity-image
                  :image="ecriture.image.asset"
                  :alt="ecriture.name"
                  :width="ecriture.image.dimensions.width"
                  :height="(ecriture.image.dimensions.width * 3) / 4"
                  fit="crop"
                />
              </figure>
            </div>
            <div class="card-content is-hidden-desktop">
              <h2 class="title is-4 has-text-centered">{{ ecriture.name }}</h2>
            </div>
          </div>
        </div>

        <div class="column" style="margin-top: auto;">
          <p class="content">{{ ecriture.description }}</p>
          <ecriture-realisations-gallery
            :images="realisationsImages"
            @click="(index) => (galleryIndex = index + 1)"
          />
          <ecriture-nav :prev="prev" :next="next" />
        </div>
      </div>
    </div>

    <client-only>
      <v-gallery
        :images="galleryImages"
        :index="galleryIndex"
        @close="galleryIndex = null"
      />
    </client-only>
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
    galleryIndex: null,
  }),
  computed: {
    galleryImages() {
      return (
        this.ecriture &&
        [this.ecriture.image]
          .concat(this.realisationsImages)
          .map((image) => this.$imgBuilder.image(image).width(1024).url())
      )
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
  },
  head() {
    return {
      title: this.ecriture && `écritures - ${this.ecriture.name}`,
      meta: this.ecriture &&
        this.ecriture.description && [
          {
            hid: `description-${this.$route.params.slug}`,
            name: "description",
            content: this.ecriture.description,
          },
        ],
    }
  },
}
</script>
