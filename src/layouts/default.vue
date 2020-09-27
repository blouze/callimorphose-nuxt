<template>
  <div>
    <navbar fixed />
    <div class="container" style="min-height: 90vh; margin-top: 4rem;">
      <nuxt />
    </div>
    <page-footer />
  </div>
</template>

<script>
export default {
  mounted() {
    const consent = this.$store.getters["analytics/consent"]
    if (!consent) {
      this.$buefy.snackbar.open({
        message: this.$t("analytics.message"),
        type: "is-primary-light",
        position: "is-bottom-right",
        actionText: this.$t("analytics.actionText"),
        indefinite: true,
        onAction: () => {
          this.$store.commit("analytics/consent")
          this.$ga.enable()
        },
      })
    }
  },
  head() {
    return {
      link: [
        {
          rel: "canonical",
          href: "https://callimorphose.com" + this.$route.path,
        },
      ],
      bodyAttrs: { class: "has-navbar-fixed-top" },
    }
  },
}
</script>
