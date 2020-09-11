<template>
  <section class="section">
    <h2 class="title is-2">
      écritures
    </h2>

    <div
      class="columns is-multiline is-variable is-5-desktop"
      style="justify-content: flex-end;"
    >
      <nuxt-link
        v-for="{ id, name, image, slug } in ecritures"
        :key="id"
        class="column is-half ecriture"
        :to="{ name: 'ecritures-slug', params: { slug } }"
      >
        <div class="card">
          <div class="card-image">
            <figure v-if="image" class="image is-4by3">
              <sanity-image
                :image="image.asset"
                :alt="name"
                :width="image.dimensions.width"
                :height="image.dimensions.height"
                :size-factor="0.8"
              />
            </figure>
          </div>
          <div class="card-content">
            <h4 class="subtitle is-4 has-text-centered">
              {{ name }}
            </h4>
          </div>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import query from "~/groq/queries/ecritures"

export default {
  name: "EcrituresPage",
  async fetch() {
    this.ecritures = await this.$sanity.fetch(query)
  },
  data: () => ({
    ecritures: [],
  }),
}
</script>
