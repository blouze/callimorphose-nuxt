<template>
  <form @submit="checkForm">
    <fieldset :disabled="disabled">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">email&nbsp;:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input v-model.trim="$v.email.$model" class="input" :class="{ 'is-danger': $v.email.$error }" type="email" placeholder="e-mail">
              <span class="icon is-small is-left">
                <font-awesome-icon :icon="['fas', 'envelope']" />
              </span>
              <span v-if="$v.email.$error" class="icon is-small is-right has-text-danger">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
              </span>
            </div>
            <p v-if="!$v.email.required" class="help is-danger">
              Email is required
            </p>
            <p v-if="!$v.email.isEmail" class="help is-danger">
              This email is invalid
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">nom&nbsp;:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input v-model="last_name" class="input" placeholder="nom">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="first_name" class="input" placeholder="prénom">
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">sujet&nbsp;:</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <div class="select">
              <select>
                <option>Information</option>
                <option>Devis</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div> -->

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">message&nbsp;:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control is-expanded">
              <textarea v-model.trim="$v.message.$model" class="textarea" placeholder="Bonjour..." />
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal" />
        <div class="field-body">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="consent" type="checkbox">
                J'ai connaissance de la <nuxt-link to="">politique de confidentialité</nuxt-link>.
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button is-link" :disabled="$v.email.$error || !consent">
            Envoyer
          </button>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { required, email as isEmail } from 'vuelidate/lib/validators'

export default {
  name: 'ContactForm',

  props: {
    disabled: { type: Boolean, default: false }
  },

  data: () => ({
    email: 'blouze@gmail.com',
    first_name: '',
    last_name: '',
    message: '',
    consent: false
  }),

  validations: {
    email: { required, isEmail },
    message: { required }
  },

  methods: {
    checkForm (e) {
      if (!this.$v.error) {
        this.$emit('submit', {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          message: this.message
        })
      }
      e.preventDefault()
    }
  }
}
</script>
