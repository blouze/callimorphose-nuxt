export const state = () => ({
  agreedToPrivacy: false,
})

export const mutations = {
  initialize(state) {
    if (process.browser) {
      // localStorage.removeItem("agreedToPrivacy")
      if (localStorage.getItem("agreedToPrivacy")) {
        state.agreedToPrivacy = true
      }
    }
  },
  consent(state) {
    localStorage.setItem("agreedToPrivacy", true)
    state.agreedToPrivacy = true
  },
}

export const getters = {
  consent: (state) => state.agreedToPrivacy,
}
