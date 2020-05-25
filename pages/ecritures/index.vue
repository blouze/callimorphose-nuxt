<template>
  <div>
    <section class="section hero is-white">
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
  components: { EcrituresList }
}
</script>
