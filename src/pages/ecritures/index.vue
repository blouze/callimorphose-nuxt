<template>
  <div>
    <section class="section">
      <h1 class="title is-2">
        <DotLeader>
          <template v-slot:end>écritures</template>
        </DotLeader>
      </h1>
    </section>

    <section class="section">
      <ecritures-list :ecritures="ecritures" />
    </section>
  </div>
</template>

<script>
import query from "~/groq/queries/page"

export default {
  name: "EcrituresPage",
  async fetch() {
    const { pageBuilder: ecritures, meta } = await this.$sanity.fetch(query, {
      slug: "ecritures",
    })
    this.ecritures = ecritures
    this.meta = meta.map(({ name, content }) => ({
      hid: name,
      name: name,
      content,
    }))
  },
  data: () => ({
    ecritures: [],
    meta: [],
  }),
  head() {
    return {
      title: "écritures",
      meta: this.meta,
    }
  },
}
</script>
