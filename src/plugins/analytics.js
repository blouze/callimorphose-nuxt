import Vue from "vue"
import VueAnalytics from "vue-analytics"

export default (context, inject) => {
  context.store.commit("analytics/initialize")
  const consent = context.store.getters["analytics/consent"]
  Vue.use(VueAnalytics, {
    id: context.env.GA_TRACKING_ID,
    router: context.app.router,
    disabled: !consent,
  })
}
