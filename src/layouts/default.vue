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
  head() {
    return this.$route.path !== this.localePath("index")
      ? {
          title: null,
          titleTemplate: `%s — ${process.env.siteName}`,
          bodyAttrs: { class: "has-navbar-fixed-top" },
        }
      : {
          title: process.env.siteName,
          bodyAttrs: { class: "has-navbar-fixed-top" },
        }
  },
}
</script>
