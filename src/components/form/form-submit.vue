<template>
  <div class="field">
    <div class="field-label is-normal"></div>
    <div class="field-body">
      <b-button
        type="is-primary is-fullwidth"
        native-type="submit"
        :disabled="disabled"
        :loading="loading"
        :label="label"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default() {
        return this.$t("form.send")
      },
    },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
}
</script>
