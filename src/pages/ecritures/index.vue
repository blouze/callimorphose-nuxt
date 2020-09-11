<template>
  <section class="section">
    <h2 class="title is-2">
      écritures
    </h2>

    <div class="columns is-multiline" style="justify-content: flex-end;">
      <nuxt-link
        v-for="{ id, name, image, slug } in ecritures"
        :key="id"
        class="column is-half ecriture"
        :to="{ name: 'ecritures-slug', params: { slug } }"
      >
        <div class="card">
          <div class="card-image">
            <figure v-if="image" class="image is-4by3">
              <img
                v-lazy="getImageUrl(image, 'medium')"
                v-bind="getImageProps(image, 'medium', { lazy: true })"
                :alt="name"
              />
            </figure>
          </div>
          <div class="card-content">
            <h4 class="title is-4 has-text-centered">
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
