<template>
  <div>
    <section class="section" />

    <section class="section hero is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            merci
          </h1>
          <h2 class="subtitle">
            <p>Votre message nous a bien été envoyé.</p>
            <p>Nous allons bientôt vous répondre...</p>
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ContactMerciPage',
  middleware ({ route, redirect }) {
    if (!route.params.messageSent) {
      return redirect('/')
    }
  }
}
</script>
