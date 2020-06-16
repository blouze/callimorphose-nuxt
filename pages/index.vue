<template>
  <div class="">
    <section class="hero is-medium column is-half is-offset-one-quarter">
      <div class="hero-body">
        <div class="container">
          <object type="image/svg+xml" :data="Animation" style="width: 100%" />
        </div>
      </div>
      <figure class="has-text-centered">
        <img src="~/assets/separator.svg">
      </figure>
    </section>

    <section class="section">
      <div v-if="$apollo.queries.ecritures.loading">
        <Loader />
      </div>

      <div v-else class="container">
        <EcrituresList :ecritures="ecritures" />
      </div>
    </section>
  </div>
</template>

<script>
import Animation from '@/assets/CALLIMORPHOSE_draw.svg?data'
import ecrituresQuery from '~/apollo/queries/ecriture/ecritures'
import { EcrituresList, Loader } from '~/components'

export default {
  name: 'IndexPage',
  components: { EcrituresList, Loader },
  apollo: {
    ecritures: {
      prefetch: true,
      query: ecrituresQuery
    }
  },
  data: () => ({ Animation }),
  head () {
    return {
      title: 'Callimorphose',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description-index',
          content: `
            Callimorphose - découvrez l'univers de la calligraphie et du patrimoine de l'écriture.
          `
        }
      ]
    }
  }
}
</script>
