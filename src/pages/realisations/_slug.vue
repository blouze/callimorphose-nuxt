<template>
  <section class="section">
    <div v-if="!$fetchState.pending">
      <h2 class="title is-2">
        {{ ecriture.name }}
      </h2>
    </div>
  </section>
</template>

<script>
import query from "~/groq/queries/ecriture"

export default {
  name: "EcriturePage",
  async fetch() {
    const { slug } = this.$route.params
    this.ecriture = await this.$sanity.fetch(query, { slug })
  },
  data: () => ({
    ecriture: null,
  }),
  head() {
    return {
      title: this.ecriture && `écritures - ${this.ecriture.name}`,
    }
  },
}
</script>
