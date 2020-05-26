<template>
  <nav class="navbar is-fixed-top is-white" role="navigation" aria-label="main navigation" :class="{ 'is-spaced': !dense }">
    <div class="container">
      <div class="navbar-brand">
        <component :is="$route.name !== 'index' ? 'nuxt-link' : 'div'" to="/">
          <figure class="image" :style="{ 'width': dense ? '70%' : '100%' }" :class="{ 'hidden': !dense && $route.name === 'index'}">
            <img src="~/assets/CALLIMORPHOSE.svg" class="navbar-item">
          </figure>
        </component>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <nuxt-link class="navbar-link" to="/ecritures">
              écritures
            </nuxt-link>

            <div class="navbar-dropdown">
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
            </div>
          </div>

          <nuxt-link class="navbar-item" to="/realisations">
            réalisations
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    dense: false
  }),
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar, .navbar-brand *
  transition: 0.3s

.navbar-brand
  opacity: 1
  .hidden
    opacity: 0
</style>
