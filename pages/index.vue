<template>
  <div class="">
    <section class="hero is-fullheight column is-half is-offset-one-quarter">
      <div class="hero-body">
        <div class="container">
          <object type="image/svg+xml" :data="Animation" style="width: 100%" />
        </div>
      </div>
    </section>

    <section v-if="!$apollo.queries.ecritures.loading" class="section">
      <div class="container">
        <EcrituresList />
      </div>
    </section>
  </div>
</template>

<script>
import Animation from '@/assets/CALLIMORPHOSE_draw.svg?data'
import ecrituresQuery from '~/apollo/queries/ecriture/ecritures'
import { EcrituresList } from '~/components'

export default {
  name: 'IndexPage',
  components: { EcrituresList },
  data: () => ({ Animation }),
  apollo: {
    ecritures: {
      prefetch: true,
      query: ecrituresQuery
    }
  },
  head () {
    return {
      title: 'Callimorphose',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        // { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>
