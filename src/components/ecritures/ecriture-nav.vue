<template>
  <div class="level mt-6 mb-2">
    <div class="level-left has-text-centered">
      <nuxt-link
        v-if="prev"
        class="level-item is-size-5 mr-5"
        :to="
          localeRoute({
            name: 'ecritures-slug',
            params: { slug: prev.slug },
          })
        "
      >
        &#x2190;&nbsp;{{ prev.name }}
      </nuxt-link>
    </div>
    <div class="level-right has-text-centered">
      <nuxt-link
        v-if="next"
        class="level-item is-size-5 ml-5"
        :to="
          localeRoute({
            name: 'ecritures-slug',
            params: { slug: next.slug },
          })
        "
      >
        {{ next.name }}&nbsp;&#x2192;
        <div />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prev: { type: Object, required: true },
    next: { type: Object, required: true },
  },
}
</script>

<style lang="scss" scoped>
.level-item {
  font-family: $family-serif;
}
</style>
