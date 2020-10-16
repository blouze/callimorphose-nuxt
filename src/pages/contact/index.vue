<template>
  <section class="section">
    <h1 class="title is-2">
      contact
    </h1>
    <h5 class="subtitle is-5">
      Parlez-nous de votre projet...
    </h5>

    <div class="container">
      <div class="columns">
        <div class="column" style="order: 1;">
          <contact-form
            :disabled="formSubmitted"
            :loading="formSubmitted"
            @submit="onFormSubmit"
          />
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
              <video
                width="1280"
                height="720"
                playsinline
                autoplay
                muted
                loop
                :poster="videoPosterURL"
              >
                <source type="video/mp4" :src="videoURL" />
              </video>
            </figure>
          </client-only>

          <h3 class="title is-3">
            À propos
          </h3>

          <p class="content">
            Diplômée d'état en design objet, puis élève de Serge&nbsp;Cortesi et
            collaboratrice de
            <a @click="openLink(mdlcURL)"
              >La&nbsp;Maison&nbsp;de&nbsp;la&nbsp;Calligraphie</a
            >, <span class="celine-renaudie">Céline&nbsp;Renaudie</span> crée en
            2017 l'atelier&nbsp;Callimorphose.
          </p>
          <p class="content">
            L'atelier propose des services de papeterie, prestations
            événementielles, travaux sur documents anciens, formation et cours
            particuliers...
          </p>

          <span class="subtitle is-7">
            Crédits vidéo:&nbsp;
            <b-button
              type="is-text"
              size="is-small"
              label="7F"
              icon-left="instagram"
              icon-pack="fab"
              @click="openLink(`https://www.instagram.com/7f_7f_7f/`)"
            />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { page } from "~/mixins"

export default {
  name: "ContactPage",
  mixins: [page],
  data: () => ({
    slug: "contact",
    videoURL: process.env.videoURL,
    videoPosterURL: process.env.videoPosterURL,
    mdlcURL: "https://www.lamaisondelacalligraphie.com",
    formSubmitted: false,
    formError: null,
  }),
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&")
    },
    onFormSubmit(params) {
      this.formSubmitted = true
      this.$axios
        .post(
          "/",
          this.encode({
            "form-name": "contact",
            ...params,
          }),
          { header: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(({ data }) => {
          this.$router.push(
            this.localeRoute({
              name: "contact-merci",
              params: { messageSent: true },
            })
          )
        })
        .catch((err) => {
          this.formError = err.response.data.message
        })
        .finally(() => {
          this.formSubmitted = false
        })
    },
  },
  jsonld() {
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "À propos de l'atelier Callimorphose",
      "url": "https://callimorphose.com/contact/",
      "description":
        "Contactez l'atelier Callimorphose, parlez-nous de de votre projet et de vos envies, ou posez directement vos questions.",
      "thumbnailUrl": [
        "https://storage.cloud.google.com/callimorphose.appspot.com/video-poster.jpg",
      ],
      "uploadDate": "2020-09-27T16:41:38+02:00",
      "duration": "T00H00M59S",
      "contentUrl":
        "https://storage.googleapis.com/callimorphose.appspot.com/FREAKSHOW.mp4",
      "embedUrl": "https://www.youtube.com/embed/tJ2jlqPiEqQ",
      "interactionStatistic": {},
    }
  },
}
</script>
<style lang="scss" scoped>
.celine-renaudie {
  text-decoration-line: underline;
}
</style>
