<template>
  <div class="columns is-multiline">
    <nuxt-link v-for="{id, name, image} in ecritures" :key="id" class="column is-half ecriture" :to="{ name: 'ecritures-id', params: { id } }">
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <img :src="`http://localhost:1337${image.formats['medium'].url}`">
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
import ecrituresQuery from '~/apollo/queries/ecriture/ecritures'

export default {
  name: 'EcrituresList',
  apollo: {
    ecritures: {
      prefetch: true,
      query: ecrituresQuery
    }
  }
}
</script>
