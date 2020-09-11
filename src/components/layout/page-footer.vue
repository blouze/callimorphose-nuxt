<template>
  <footer class="footer">
    <div class="container">
      <div class="columns multiline">
        <div class="column is-half"></div>

        <div class="column has-text-right" style="margin-top: auto;">
          <small class="is-size-7">
            {{ siteAuthor }} © {{ new Date().getFullYear() }}
          </small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    siteAuthor() {
      return process.env.siteAuthor
    },
  },
}
</script>
