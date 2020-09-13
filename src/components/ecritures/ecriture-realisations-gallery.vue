<template>
  <div class="columns is-mobile is-multiline">
    <div v-for="(image, i) in images" :key="i" class="column is-half">
      <figure class="image" @click="index = i + 1">
        <sanity-image
          :image="image.asset"
          :alt="image.name"
          :width="image.dimensions.width"
          :height="image.dimensions.height"
          :size-factor="0.5"
        />
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: { type: Array, default: () => [] },
  },
}
</script>

<style></style>
