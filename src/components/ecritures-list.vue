<template>
  <div
    class="columns is-multiline is-variable is-5-desktop"
    style="justify-content: flex-end;"
  >
    <nuxt-link
      v-for="{ id, name, image, slug } in ecritures"
      :key="id"
      class="column is-half"
      :to="localeRoute({ name: 'ecritures-slug', params: { slug } })"
    >
      <div class="card has-background-white">
        <div class="card-image has-background-white-ter">
          <figure v-if="image" class="image is-4by3">
            <sanity-image
              :image="image.asset"
              :title="`écriture ${name}`"
              :width="image.dimensions.width"
              :height="(image.dimensions.width * 3) / 4"
              fit="crop"
            />
          </figure>
        </div>
        <div class="card-content">
          <h4 class="title is-4 has-text-centered">
            {{ name }}
          </h4>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    ecritures: { type: Array, default: () => [] },
  },
}
</script>

<style lang="scss" scoped>
a {
  & h4.title {
    color: $link;
  }
  &:hover h4.title {
    color: $text;
  }
}
</style>
