<template>
  <footer class="footer has-background-white-ter">
    <div class="container">
      <div class="content">
        <div class="tile is-ancestor">
          <div class="tile is-child has-text-centered is-4">
            <figure class="image is-3by1">
              <img src="~/assets/CALLIMORPHOSE.svg" class="navbar-item">
            </figure>
            <h6 class="title is-6">
              Atelier de calligraphie
            </h6>
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
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    email () { return process.env.EMAIL_ADRESS },
    instagramURL () { return process.env.INSTAGRAM_URL }
  },
  methods: {
    openLink (url) { window.open(url) }
  }
}
</script>

<style>

</style>
