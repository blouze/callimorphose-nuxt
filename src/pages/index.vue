<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-head" />
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-half">
              <Animation style="width: 100%; height: auto;" />
            </div>
          </div>
          <div class="hero-foot" style="margin-top: auto;">
            <figure class="has-text-centered">
              <Separator />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <ecritures-list :ecritures="ecritures" />
    </section>
  </div>
</template>

<script>
import Animation from "~/assets/CALLIMORPHOSE_draw.svg"
import Separator from "~/assets/separator.svg"
import query from "~/groq/queries/page"

export default {
  name: "IndexPage",
  components: { Animation, Separator },
  async fetch() {
    const { pageBuilder: ecritures } = await this.$sanity.fetch(query, {
      slug: "ecritures",
    })
    this.ecritures = ecritures
  },
  data: () => ({
    ecritures: [],
  }),
}
</script>
