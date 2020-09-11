<template>
  <div>
    <navbar :fixed="hasFixedNavbar" type="is-secondary" />
    <div
      class="container"
      style="min-height: 100vh;"
      :class="{ 'has-navbar-fixed-top': hasFixedNavbar }"
    >
      <nuxt />
    </div>
    <page-footer />
  </div>
</template>

<script>
export default {
  data: () => ({
    hasFixedNavbar: true,
  }),
  head() {
    return {
      title: null,
      titleTemplate: `%s | ${process.env.siteName}`,
    }
  },
}
</script>
