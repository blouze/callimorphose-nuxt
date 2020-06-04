<template>
  <div>
    <section class="section" />

    <section class="section hero is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            contact
          </h1>
          <h2 class="subtitle">
            Parlez-nous de votre projet...
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <client-only>
              <figure class="image">
                <video width="1280" height="720" autoplay loop>
                  <source type="video/mp4" :src="videoURL">
                </video>
              </figure>
            </client-only>
          </div>
          <div class="column">
            <div class="card-content">
              <ContactForm v-if="!messageSent" :disabled="formSubmitted" @submit="onFormSubmit" />
              <div v-if="formError">
                <p class="has-text-danger">
                  Une erreur est survenue pendant l'envoi du message: {{ formError }}
                </p>
                <p>Réessayez plus tard...</p>
              </div>
              <div v-else-if="messageSent">
                <p>Votre message a bien été envoyé.</p>
                <p>Nous allons bientôt vous répondre.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ContactForm } from '~/components'

export default {
  name: 'ContactPage',
  components: { ContactForm },
  data: () => ({
    videoURL: process.env.VIDEO_URL,
    messageSent: false,
    formSubmitted: false,
    formError: null
  }),
  methods: {
    onFormSubmit (params) {
      this.formSubmitted = true
      this.$axios({
        method: 'post',
        url: `${process.env.BACKEND_URL}/contact`,
        data: params
      }
      ).then(({ data }) => {
        if (data === 'ok') {
          this.messageSent = true
        } else {
          this.messageSent = true
          this.formError = data.message
        }
      }).catch((err) => {
        this.formError = err
      }).finally(() => {
        this.formSubmitted = false
      })
    }
  }
}

</script>
<style>

</style>
