<template>
  <div v-if="$apollo.loading">
    <Loader />
  </div>

  <div v-else>
    <section class="section" />

    <section class="section">
      <div class="container">
        <div class="tile is-ancestor">
          <div class="tile is-8 is-parent">
            <figure v-if="image" class="image gallery-item" @click="index = imgs.length - 1">
              <img :src="getImagePath(image)">
            </figure>
          </div>
          <div class="tile is-vertical is-parent">
            <div class="tile is-child">
              <h2 class="title is-3 has-text-centered">
                {{ name }}
              </h2>

              <div class="level is-mobile">
                <div class="level-left">
                  <nuxt-link v-if="prev" class="title is-6" :to="{ name: 'ecritures-slug', params: { slug: prev.slug } }">
                    &#x2190;&nbsp;{{ prev.name }}
                  </nuxt-link>
                </div>
                <div class="level-right">
                  <nuxt-link v-if="next" class="title is-6" :to="{ name: 'ecritures-slug', params: { slug: next.slug } }">
                    {{ next.name }}&nbsp;&#x2192;
                    <div />
                  </nuxt-link>
                </div>
              </div>

              <p class="content">
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
import { Loader } from '~/components'

export default {
  name: 'EcritureDetailsPage',
  components: { Loader },
  apollo: {
    ecriture: {
      prefetch: true,
      query: ecritureQuery,
      variables () { return { slug: this.$route.params.slug } },
      update ({ ecritureBySlug }) { return ecritureBySlug }
    }
  },
  data: () => ({ index: null }),
  computed: {
    name () { return this.ecriture && this.ecriture.name },
    priority () { return this.ecriture && this.ecriture.priority },
    image () { return this.ecriture && this.ecriture.image && this.ecriture.image.formats.large.url },
    description () { return this.ecriture && this.ecriture.description },
    realisations () { return this.ecriture && this.ecriture.realisations },
    imgs () {
      return this.realisations && this.realisations.map(realisation => realisation.images[0].formats.large.url).concat(this.image)
    },
    prev () { return this.ecriture && this.ecriture.prev },
    next () { return this.ecriture && this.ecriture.next }
  },
  head () {
    return {
      title: this.name ? `${this.name.charAt(0).toUpperCase() + this.name.slice(1)} | écritures | Callimorphose` : 'écritures | Callimorphose',
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
