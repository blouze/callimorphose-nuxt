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
        <div class="column is-two-thirds-desktop">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <sanity-image
                  :image="ecriture.image.asset"
                  :alt="ecriture.name"
                  :width="ecriture.image.dimensions.width"
                  :height="ecriture.image.dimensions.height"
                />
              </figure>
            </div>
            <div class="card-content is-hidden-desktop">
              <h2 class="title is-3">
                <DotLeader>
                  <template v-slot:end>
                    <span>{{ ecriture.name }} </span>
                  </template>
                </DotLeader>
              </h2>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="level is-mobile">
            <div class="level-left">
              <nuxt-link
                v-if="prev"
                class="title is-5"
                :to="
                  localeRoute({
                    name: 'ecritures-slug',
                    params: { slug: prev.slug },
                  })
                "
              >
                &#x2190;&nbsp;{{ prev.name }}
              </nuxt-link>
            </div>
            <div class="level-right">
              <nuxt-link
                v-if="next"
                class="title is-5"
                :to="
                  localeRoute({
                    name: 'ecritures-slug',
                    params: { slug: next.slug },
                  })
                "
              >
                {{ next.name }}&nbsp;&#x2192;
                <div />
              </nuxt-link>
            </div>
          </div>

          <div
            class="column columns is-mobile is-multiline"
            style="margin-top: auto;"
          >
            <p class="column is-full">{{ ecriture.description }}</p>
            <div
              v-for="(image, i) in realisationsImages"
              :key="i"
              class="column is-half"
            >
              <figure class="image" @click="index = i + 1">
                <sanity-image
                  :image="image.asset"
                  :alt="image.name"
                  :width="image.dimensions.width"
                  :height="image.dimensions.height"
                />
              </figure>
            </div>
          </div>
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
      return this.ecriture
    },
    next() {
      return this.ecriture
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
