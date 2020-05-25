<template>
  <div>
    <section class="section hero is-white">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            réalisations
          </h1>
          <h2 class="subtitle">
            <!-- Primary subtitle -->
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div v-for="{id, title, images} in realisations" :key="id">
          <h3 class="title is-3">
            {{ title }}
          </h3>
          <figure v-for="{id: imageId, formats} in images" :key="imageId" class="image is-4by3">
            <img :src="`http://localhost:1337${formats['medium'].url}`">
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import realisationsQuery from '~/apollo/queries/realisation/realisations'

export default {
  name: 'RealisationsPage',
  apollo: {
    realisations: {
      prefetch: true,
      query: realisationsQuery
    }
  }
}
</script>
