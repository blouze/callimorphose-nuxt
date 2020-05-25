<template>
  <div>
    <section class="section hero is-white">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            écritures - {{ name }}
          </h1>
          <h2 class="subtitle">
          <!-- Primary subtitle -->
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <figure class="image">
          <img :src="`http://localhost:1337${image}`">
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import ecritureQuery from '~/apollo/queries/ecriture/ecriture'

export default {
  name: 'EcritureDetails',
  apollo: {
    ecriture: {
      prefetch: true,
      query: ecritureQuery,
      variables () { return { id: this.$route.params.id } }
    }
  },
  computed: {
    name () { return this.ecriture && this.ecriture.name },
    image () { return this.ecriture && this.ecriture.image.formats.medium.url }
  }
}
</script>
