<template>
  <div>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-half">
              <h1 class="title is-hidden">{{ siteName }}</h1>
              <Animation style="width: 100%; height: auto;" />
            </div>
          </div>
          <div class="hero-foot my-6">
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
import { page } from "~/mixins"
import Animation from "~/assets/CALLIMORPHOSE_draw.svg"
import Separator from "~/assets/separator.svg"

export default {
  name: "IndexPage",
  components: { Animation, Separator },
  mixins: [page],
  data: () => ({ slug: "index" }),
  computed: {
    ecritures() {
      return this.pageBuilder
    },
    siteName() {
      return process.env.siteName
    },
  },
}
</script>
