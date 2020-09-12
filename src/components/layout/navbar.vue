<template>
  <b-navbar :fixed-top="fixed" :type="type" wrapper-class="container">
    <template slot="brand">
      <b-navbar-item
        :tag="!isIndex ? 'nuxt-link' : 'div'"
        :to="localeRoute({ name: 'index' })"
      >
        <figure
          class="image"
          :style="{
            width: dense || isIndex ? '60%' : '80%',
            margin: 'auto',
          }"
          :class="{
            hidden: (!dense && isIndex) || isScrollEnd,
          }"
        >
          <Logo style="width: 100%; height: 100%;" />
        </figure>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item
        v-for="({ name, slug }, index) in links"
        :key="index"
        tag="nuxt-link"
        :to="localeRoute({ name: slug })"
      >
        {{ name }}
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Logo from "~/assets/CALLIMORPHOSE.svg"
import query from "~/groq/queries/pages"

export default {
  components: { Logo },
  props: {
    fixed: { type: Boolean, default: false },
    type: { type: String, default: "has-background-white" },
  },
  async fetch() {
    this.pages = await this.$sanity.fetch(query)
  },
  data: () => ({
    pages: [],
    dense: false,
    isMenuOpen: false,
    isScrollEnd: false,
  }),
  computed: {
    links() {
      return this.pages
        .filter(({ slug }) => slug !== "index")
        .concat([{ name: "contact", slug: "contact" }])
    },
    siteName() {
      return process.env.siteName
    },
    isIndex() {
      return this.$route.path === this.localePath("index")
    },
  },
  watch: {
    $route() {
      this.isMenuOpen = false
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  mounted() {
    this.handleScroll()
  },
  methods: {
    handleScroll() {
      this.dense = window.scrollY > 200
      this.isScrollEnd =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
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

.navbar,
.navbar-brand *,
.navbar-menu {
  transition: all 0.3s ease-in-out;
}

.navbar-brand {
  opacity: 1;
  .hidden {
    opacity: 0;
  }
}

/* @media screen and (max-width: 1023px) {
  .navbar-menu {
    min-height: 0;
    &.is-active {
      min-height: calc(100vh - 8rem);
    }
  }
} */
</style>
