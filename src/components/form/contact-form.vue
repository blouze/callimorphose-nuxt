<template>
  <form
    name="contact"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="checkForm"
  >
    <fieldset :disabled="disabled">
      <form-input
        name="email"
        :label="$t('contact.fields.email')"
        :placeholder="$t('contact.fields.email')"
        icon="envelope"
        :validation="$v.email"
      />

      <form-input
        name="nom"
        :label="$t('contact.fields.nom')"
        :placeholder="$t('contact.fields.nom')"
        :validation="$v.nom"
      />

      <form-input
        name="prenom"
        :label="$t('contact.fields.prenom')"
        :placeholder="$t('contact.fields.prenom')"
        :validation="$v.prenom"
      />

      <form-input
        name="message"
        type="textarea"
        :label="$t('contact.fields.message')"
        placeholder="Bonjour..."
        :validation="$v.message"
      />

      <b-checkbox v-model="consent">
        J'ai connaissance de la
        <nuxt-link to="">politique de confidentialité</nuxt-link>.
      </b-checkbox>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-primary"
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
    nom: "",
    prenom: "",
    message: "",
    consent: false,
  }),

  validations: {
    email: { required, isEmail },
    nom: { required },
    prenom: { required },
    message: {},
  },

  methods: {
    checkForm() {
      if (!this.$v.error) {
        this.$emit("submit", {
          email: this.$v.email.$model,
          nom: this.$v.nom.$model,
          prenom: this.$v.prenom.$model,
          message: this.$v.message.$model,
        })
      }
    },
  },
}
</script>
