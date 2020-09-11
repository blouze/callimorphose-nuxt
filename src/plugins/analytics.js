import Vue from "vue"
import VueAnalytics from "vue-analytics"

export default (context, inject) => {
  Vue.use(VueAnalytics, {
    id: context.env.GA_TRACKING_ID,
    router: context.app.router,
  })
}
