<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation" :class="{ 'is-spaced': !dense }">
    <div class="container">
      <div ref="brand" class="navbar-brand">
        <component :is="$route.name !== 'index' ? 'nuxt-link' : 'div'" to="/">
          <figure
            class="image"
            :style="{ 'width': (dense || $route.name === 'index') ? '60%' : '90%' }"
            :class="{ 'hidden': (!dense && $route.name === 'index') || isScrollEnd}"
          >
            <img src="~/assets/CALLIMORPHOSE.svg" class="navbar-item">
          </figure>
        </component>

        <a
          role="button"
          class="navbar-burger burger is-primary"
          :class="{ 'is-active': isMenuOpen }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbarMenu"
        v-bsl="isMenuOpen"
        class="navbar-menu is-shadowless"
        :class="{ 'is-active': isMenuOpen }"
      >
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <nuxt-link class="navbar-link" to="/ecritures">
              écritures
            </nuxt-link>

            <!-- <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Report an issue
              </a>
            </div> -->
          </div>

          <div class="navbar-item">
            <nuxt-link to="/realisations">
              réalisations
            </nuxt-link>
          </div>

          <div class="navbar-item">
            <nuxt-link to="/contact">
              contact
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    dense: false,
    isMenuOpen: false,
    isScrollEnd: false
  }),
  watch: {
    $route () {
      this.isMenuOpen = false
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted () {
    this.handleScroll()
  },
  methods: {
    handleScroll () {
      this.dense = window.scrollY > 300
      this.isScrollEnd = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar, .navbar-brand *, .navbar-menu
  transition: 0.3s

.navbar-brand
  opacity: 1
  .hidden
    opacity: 0

@media screen and (max-width: 1023px)
  .navbar-menu
    min-height: 0;
    &.is-active
      min-height: calc(100vh - 8rem);
</style>
