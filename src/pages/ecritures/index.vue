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
import { page } from "~/mixins"

export default {
  name: "EcrituresPage",
  mixins: [page],
  data: () => ({ slug: "ecritures" }),
  computed: {
    ecritures() {
      return this.pageBuilder
    },
  },
}
</script>
