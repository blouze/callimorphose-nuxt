<template>
  <div>
    <section class="section" />

    <section class="section hero is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-3">
            écritures
          </h1>
          <h2 class="subtitle">
            <!-- Primary subtitle -->
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <EcrituresList />
      </div>
    </section>
  </div>
</template>

<script>
import { EcrituresList } from '~/components'

export default {
  name: 'EcrituresPage',
  components: { EcrituresList },
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
