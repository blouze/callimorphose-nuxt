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
              <span v-if="$v.email.$dirty && $v.email.$invalid" class="icon is-small is-right has-text-danger">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
              </span>
            </div>
            <p v-if="$v.email.$dirty && !$v.email.required" class="help is-danger">
              inscrivez votre email
            </p>
            <p v-if="$v.email.$dirty && !$v.email.isEmail" class="help is-danger">
              cette adresse est érronée
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
            <div class="control has-icons-right">
              <input v-model="$v.last_name.$model" class="input" placeholder="nom">
              <span v-if="$v.last_name.$dirty && $v.last_name.$invalid" class="icon is-small is-right has-text-danger">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
              </span>
            </div>
            <p v-if="$v.last_name.$dirty && !$v.last_name.required" class="help is-danger">
              inscrivez votre nom
            </p>
          </div>

          <div class="field">
            <div class="control has-icons-right">
              <input v-model="$v.first_name.$model" class="input" placeholder="prénom">
              <span v-if="$v.first_name.$dirty && $v.first_name.$invalid" class="icon is-small is-right has-text-danger">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
              </span>
            </div>
            <p v-if="$v.first_name.$dirty && !$v.first_name.required" class="help is-danger">
              inscrivez votre prénom
            </p>
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
        <div class="field-body ">
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
          <button class="button is-link" :disabled="$v.$invalid || !consent" :class="{ 'is-loading': loading }">
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
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },

  data: () => ({
    email: '',
    first_name: '',
    last_name: '',
    message: '',
    consent: false
  }),

  validations: {
    email: { required, isEmail },
    first_name: { required },
    last_name: { required },
    message: {}
  },

  methods: {
    checkForm (e) {
      if (!this.$v.error) {
        this.$emit('submit', {
          email: this.$v.email.$model,
          first_name: this.$v.first_name.$model,
          last_name: this.$v.last_name.$model,
          message: this.$v.message.$model
        })
      }
      e.preventDefault()
    }
  }
}
</script>
