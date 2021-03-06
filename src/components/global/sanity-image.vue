<template>
  <picture>
    <source
      v-for="({ media, width: w }, index) in sizes"
      :key="index"
      :media="`(max-width: ${media}px)`"
      :data-srcset="getSrcSet(w * sizeFactor)"
    />
    <b-loading v-model="lazyloading" :is-full-page="false" />
    <img
      class="lazyload"
      :title="title"
      :alt="`${title} — Callimorphose`"
      :data-src="src"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2P49evXfwAJzgPuMtDh2wAAAABJRU5ErkJggg=="
    />
  </picture>
</template>

<script>
export default {
  name: "SanityImage",
  props: {
    sizeFactor: {
      type: Number,
      default: 1.0,
    },
    sizes: {
      type: Array,
      default: () => [
        { media: 375, width: 330 },
        { media: 769, width: 720 },
        { media: 1024, width: 600 },
        { media: 1408, width: 860 },
        { media: 2560, width: 860 },
      ],
    },
    image: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    auto: {
      type: String,
      default: "format",
    },
    fit: {
      type: String,
      default: "max",
    },
    bg: {
      type: String,
      default: "FFFFFF",
    },
  },
  data: () => ({
    lazyloading: true,
  }),
  computed: {
    src() {
      return this.$imgBuilder
        .image(this.image)
        .ignoreImageParams()
        .size(this.width, this.height)
        .auto(this.auto)
        .bg(this.bg)
        .fit(this.fit)
    },
  },
  mounted() {
    document.addEventListener("lazyloaded", (e) => {
      this.lazyloading = false
    })
  },
  methods: {
    getSrcSet(w, dpr = 1) {
      return this.$imgBuilder
        .image(this.image)
        .ignoreImageParams()
        .size(w * dpr, this.getHeightFromWidth(w, this.getAspectRatio()) * dpr)
        .auto(this.auto)
        .bg(this.bg)
        .fit(this.fit)
    },
    getHeightFromWidth(w, h) {
      return Math.floor(w * h)
    },
    getAspectRatio() {
      return this.height / this.width
    },
  },
}
</script>
