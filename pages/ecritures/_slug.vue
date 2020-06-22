<template>
  <div v-if="$apollo.loading">
    <Loader />
  </div>

  <div v-else>
    <section class="section">
      <div class="container">
        <div class="tile is-ancestor">
          <div class="tile is-8 is-parent">
            <figure v-if="image" class="image gallery-item" @click="index = 0">
              <img
                v-lazy="getImageUrl(image, 'large')"
                v-bind="getImageProps(image, 'large', { lazy: true })"
                :alt="name"
              >
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

            <div class="tile columns is-multiline" style="justify-content: flex-end">
              <div
                v-for="(real, realIndex) in reals"
                :key="real.id"
                class="column is-half"
              >
                <figure class="image gallery-item" @click="index = realIndex + 1">
                  <img
                    v-lazy="getImageUrl(real, 'small')"
                    v-bind="getImageProps(real, 'small', { lazy: true })"
                    :alt="name"
                  >
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <client-only>
      <v-gallery
        :images="images.map(img => getImageProps(img, 'large').src)"
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
    image () { return this.ecriture && this.ecriture.image && this.ecriture.image },
    description () { return this.ecriture && this.ecriture.description },
    reals () { return this.ecriture && this.ecriture.reals },
    prev () { return this.ecriture && this.ecriture.prev },
    next () { return this.ecriture && this.ecriture.next },
    images () { return [this.image].concat(this.reals) }
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
