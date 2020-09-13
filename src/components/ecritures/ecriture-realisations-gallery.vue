<template>
  <div class="columns is-mobile is-multiline">
    <div v-for="(image, index) in images" :key="index" class="column is-half">
      <figure class="image" @click="$emit('click', index)">
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
