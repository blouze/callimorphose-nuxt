<template>
  <div>
    <section class="section hero is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            écritures
          </h1>
          <h2 class="subtitle">
            <!-- Primary subtitle -->
          </h2>
        </div>
      </div>
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
import ecrituresQuery from '~/apollo/queries/ecriture/ecritures'
import { EcrituresList, Loader } from '~/components'

export default {
  name: 'EcrituresPage',
  components: { EcrituresList, Loader },
  apollo: {
    ecritures: {
      prefetch: true,
      query: ecrituresQuery
    }
  },
  head () {
    return {
      title: 'écritures | Callimorphose',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description-écritures',
          name: 'description',
          content: `
            Écritures - laissez vous surprendre par un savoir-faire unique tracée à la plume et à l'encre.
          `
        }
      ]
    }
  }
}
</script>
