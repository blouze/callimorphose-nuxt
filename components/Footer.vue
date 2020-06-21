<template>
  <footer class="footer has-background-white-bis">
    <section class="section">
      <div class="container">
        <div class="tile is-ancestor" style="align-items: flex-end;">
          <div class="tile is-child has-text-centered is-4">
            <figure class="image is-3by1">
              <img src="~assets/CALLIMORPHOSE.svg" class="navbar-item" alt="Callimorphose">
            </figure>
            <h6 class="title is-6">
              Atelier de calligraphie
            </h6>
          </div>

          <div class="tile is-child is-4">
            <ul class="links">
              <li class="navbar-item" :class="{ 'is-active': $route.name === 'ecritures' || $route.name === 'ecritures-slug' }">
                <nuxt-link :to="{ name: 'ecritures' }">
                  écritures
                </nuxt-link>
              </li>
              <li class="navbar-item" :class="{ 'is-active': $route.name === 'realisations' }">
                <nuxt-link :to="{ name: 'realisations' }">
                  réalisations
                </nuxt-link>
              </li>
              <li class="navbar-item" :class="{ 'is-active': $route.name === 'contact' }">
                <nuxt-link :to="{ name: 'contact' }">
                  contact
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="tile is-child">
            <div class="buttons">
              <button class="button is-small is-primary is-light" @click="openLink(instagramURL)">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'instagram']" />
                </span>
                <span>callimorphose</span>
              </button>
              <button class="button is-small is-primary is-light" @click="openLink(`mailto: ${email}`)">
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'envelope']" />
                </span>
                <span>{{ email }}</span>
              </button>
            </div>
          </div>
        </div>

        <p class="title is-7 has-text-right">
          DISPLAY JERKY © {{ new Date().getFullYear() }}
        </p>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    email () { return process.env.emailAdress },
    instagramURL () { return process.env.instagramURL }
  }
}
</script>
<style lang="stylus" scoped>
.footer
  padding: 1.5rem 1.5rem 0.5rem

.links
  list-style: none
  margin: 0
  border-left: 1px solid black
  li
    padding: 0 0.5rem
    a
      padding: 0.25rem

.tile
  padding-bottom: 2rem
</style>
