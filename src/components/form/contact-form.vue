<template>
  <form @submit="checkForm">
    <fieldset :disabled="disabled">
      <form-input
        name="email"
        :label="$t('contact.fields.email')"
        :placeholder="$t('contact.fields.email')"
        icon="envelope"
        :validation="$v.email"
      />
      <form-input
        name="first_name"
        :label="$t('contact.fields.first_name')"
        :placeholder="$t('contact.fields.first_name')"
        :validation="$v.first_name"
      />

      <form-input
        name="last_name"
        :label="$t('contact.fields.last_name')"
        :placeholder="$t('contact.fields.last_name')"
        :validation="$v.last_name"
      />

      <form-input
        name="message"
        type="textarea"
        :label="$t('contact.fields.message')"
        placeholder="Bonjour..."
        :validation="$v.message"
      />

      <div class="field is-horizontal">
        <div class="field-label is-normal" />
        <div class="field-body">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="consent" type="checkbox" />
                J'ai connaissance de la
                <nuxt-link to="">politique de confidentialité</nuxt-link>.
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link"
            :disabled="$v.$invalid || !consent"
            :class="{ 'is-loading': loading }"
          >
            Envoyer
          </button>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { required, email as isEmail } from "vuelidate/lib/validators"

export default {
  name: "ContactForm",

  props: {
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },

  data: () => ({
    email: "",
    first_name: "",
    last_name: "",
    message: "",
    consent: false,
  }),

  validations: {
    email: { required, isEmail },
    first_name: { required },
    last_name: { required },
    message: {},
  },

  methods: {
    checkForm() {
      if (!this.$v.error) {
        this.$emit("submit", {
          email: this.$v.email.$model,
          first_name: this.$v.first_name.$model,
          last_name: this.$v.last_name.$model,
          message: this.$v.message.$model,
        })
      }
    },
  },
}
</script>
