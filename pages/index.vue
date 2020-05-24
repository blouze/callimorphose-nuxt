<template>
  <div class="">
    <section class="hero is-fullheight column is-half is-offset-one-quarter">
      <div class="hero-body">
        <div class="container">
          <div class="content">
            <object type="image/svg+xml" :data="Animation" style="width: 100%" />
          </div>
        </div>
      </div>
    </section>

    <section v-if="!$apollo.queries.ecritures.loading" class="section">
      <div class="columns">
        <div v-for="{id, name, image} in ecritures" :key="id" class="column is-half">
          <h3 class="title is-3">
            {{ name }}
          </h3>
          <figure class="image">
            <img :src="`http://localhost:1337${image.formats['medium'].url}`">
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Animation from '@/assets/CALLIMORPHOSE_draw.svg?data'
import ecrituresQuery from '~/apollo/queries/ecriture/ecritures'

export default {
  name: 'IndexPage',
  data: () => ({ Animation }),
  apollo: {
    ecritures: {
      prefetch: true,
      query: ecrituresQuery
    }
  }
}
</script>
