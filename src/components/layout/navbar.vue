<template>
  <b-navbar :fixed-top="fixed" :type="type" wrapper-class="container">
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" :to="{ name: 'index' }">
        <h1 class="is-size-4">{{ siteName }}</h1>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item
        v-for="{ _id, slug, title } in categories"
        :key="_id"
        tag="nuxt-link"
        :to="{ name: 'category', params: { category: slug } }"
      >
        {{ title }}
      </b-navbar-item>

      <b-navbar-item @click="$store.commit('contactModal/show')">
        contact
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
// import query from "~/groq/queries/categories"

export default {
  props: {
    fixed: { type: Boolean, default: false },
    type: { type: String, default: "is-secondary" },
  },
  // async fetch() {
  //   const { categories } = await this.$sanity.fetch(query)
  //   this.categories = categories
  // },
  data: () => ({
    categories: [],
  }),
  computed: {
    siteName() {
      return process.env.siteName
    },
  },
}
</script>

<style lang="scss">
@include until($desktop) {
  .navbar-menu {
    display: block;
    opacity: 0;

    position: absolute; /* or float: left; width: 100%;*/
    left: 0;
    right: 0;

    transform: translateY(-5%);
    transition: all 0.2s ease-out;
    pointer-events: none;
  }

  .navbar-menu.is-active {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }
}
</style>
