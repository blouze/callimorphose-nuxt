<template>
  <div>
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
          <div class="column" style="order: 1;">
            <ContactForm :disabled="formSubmitted" :loading="formSubmitted" @submit="onFormSubmit" />
            <div v-if="formError">
              <p class="has-text-danger">
                Une erreur est survenue pendant l'envoi du message:
              </p>
              <p class="has-text-danger">
                {{ formError }}
              </p>
              <p>Réessayez plus tard...</p>
            </div>
          </div>

          <div class="column is-7">
            <client-only>
              <figure class="image content">
                <video width="1280" height="720" autoplay loop>
                  <source type="video/mp4" :src="videoURL">
                </video>
              </figure>
            </client-only>
            <h3 class="title is-3">
              À propos
            </h3>
            <p>
              Diplômée d'état en design objet, puis élève de Serge&nbsp;Cortesi et collaboratrice de <a @click="openLink(mdlcURL)">La&nbsp;Maison&nbsp;de&nbsp;la&nbsp;Calligraphie</a>, <span class="celine-renaudie">Céline&nbsp;Renaudie</span> crée en 2017 l'atelier&nbsp;Callimorphose.
            </p>
            <p>L'atelier propose des services de papeterie, prestations événementielles, travaux sur documents anciens, formation et cours particuliers...</p>
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
    videoURL: process.env.videoURL,
    mdlcURL: 'https://www.lamaisondelacalligraphie.com',
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
      }).then(({ data }) => {
        this.$router.push({ name: 'contact-merci', params: { messageSent: true } })
      }).catch((err) => {
        this.formError = err.response.data.message
      }).finally(() => {
        this.formSubmitted = false
      })
    }
  },
  head () {
    return {
      title: 'contact | Callimorphose',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description-contact',
          name: 'description',
          content: `
            Contact - parlez-nous de vos envies, de votre projet ou posez simplement vos questions. 
            À propos - Céline Renaudie crée en 2017 l'atelier Callimorphose.
          `
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
.celine-renaudie
  text-decoration-line: underline
</style>
