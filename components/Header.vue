<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </nuxt-link>

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
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>

</style>
