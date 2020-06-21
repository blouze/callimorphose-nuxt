<template>
  <div class="columns is-multiline" style="justify-content: flex-end;">
    <nuxt-link v-for="{id, name, image, slug} in ecritures" :key="id" class="column is-half ecriture" :to="{ name: 'ecritures-slug', params: { slug } }">
      <div class="card">
        <div class="card-image">
          <figure v-if="image" class="image is-4by3">
            <img
              v-lazy="getImageUrl(image)"
              v-bind="getImageProps(image, 'medium', { lazy: true })"
            >
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
</template>

<script>
export default {
  name: 'EcrituresList',
  props: {
    ecritures: { type: Array, default: () => ([]) }
  },
  methods: {
    getImageUrl (image) {
      return `${process.env.backendURL === 'http://localhost:1337' ? process.env.backendURL : ''}${image.formats.medium.url}`
    }
  }

}
</script>
