<template>
  <b-field
    :label="label"
    :label-for="name"
    :message="errorMessage"
    :type="{ 'is-danger': validation.$error }"
  >
    <b-input
      v-model="validation.$model"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :icon="icon"
    />
  </b-field>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "input",
    },
    icon: {
      type: String,
      default: null,
    },
    validation: {
      type: Object,
      required: true,
    },
  },

  computed: {
    errorMessage() {
      if (this.validation.$dirty && this.validation.$invalid) {
        if (!this.validation.required) {
          return this.$t("form.validation.required")
        }
        if (!this.validation.isEmail) {
          return this.$t("form.validation.isEmail")
        }
      }
      return null
    },
  },
}
</script>
