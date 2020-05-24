<template>
  <div>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            écritures
          </h1>
          <h2 class="subtitle">
            <!-- Primary subtitle -->
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div v-for="{id, name, image} in ecritures" :key="id">
        <h3 class="title is-3">
          {{ name }}
        </h3>
        <figure v-for="{id: imageId, formats} in image" :key="imageId" class="image is-4by3">
          <img :src="`http://localhost:1337${formats['medium'].url}`">
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import ecrituresQuery from '~/apollo/queries/ecriture/ecritures'

export default {
  name: 'EcrituresPage',
  apollo: {
    ecritures: {
      prefetch: true,
      query: ecrituresQuery
    }
  }
}
</script>
