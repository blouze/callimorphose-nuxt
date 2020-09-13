<template>
  <footer class="footer">
    <section class="section">
      <div class="container">
        <div class="tile is-ancestor" style="align-items: flex-end;">
          <div class="tile is-child has-text-centered is-4">
            <figure class="image">
              <Logo style="width: 60%; height: auto;" />
            </figure>
            <h6 class="title is-6">
              Atelier de calligraphie
            </h6>
          </div>

          <div class="tile is-child is-4">
            <ul class="links">
              <li v-for="({ name, title }, index) in links" :key="index">
                <b-navbar-item
                  tag="nuxt-link"
                  :to="localeRoute({ name })"
                  :active="$route.path === localePath(name)"
                >
                  {{ title }}
                </b-navbar-item>
              </li>
            </ul>
          </div>

          <div class="tile is-child">
            <div class="buttons">
              <button
                class="button is-small is-outlined is-primary is-light"
                @click="openLink(instagramURL)"
              >
                <span class="icon">
                  <b-icon icon="instagram" pack="fab" />
                </span>
                <span>callimorphose</span>
              </button>
              <button
                class="button is-small is-outlined is-primary is-light"
                @click="openLink(`mailto: ${email}`)"
              >
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'envelope']" />
                </span>
                <span>{{ email }}</span>
              </button>
            </div>
          </div>
        </div>

        <p class="subtitle is-7 has-text-right">
          {{ siteAuthor }} © {{ new Date().getFullYear() }}
        </p>
      </div>
    </section>
  </footer>
</template>

<script>
import Logo from "~/assets/CALLIMORPHOSE.svg"

export default {
  components: { Logo },
  data: () => ({
    links: [
      { name: "ecritures", title: "écritures" },
      { name: "realisations", title: "réalisations" },
      { name: "contact", title: "contact" },
    ],
  }),
  computed: {
    siteAuthor() {
      return process.env.siteAuthor
    },
    email() {
      return process.env.emailAdress
    },
    instagramURL() {
      return process.env.instagramURL
    },
  },
}
</script>

<style lang="stylus" scoped>
.footer
  padding: 1.5rem 1.5rem 0.5rem

.links
  list-style: none
  margin: 0
  border-left: 1px solid black

.tile
  padding-bottom: 2rem
</style>
