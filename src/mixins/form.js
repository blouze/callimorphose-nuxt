export default {
  data: () => ({
    submitted: false,
    errors: null,
    success: false,
  }),

  methods: {
    async action() {},

    submit(params) {
      this.submitted = true
      this.errors = null

      this.action(params)
        .then((response) => {
          this.success = true
        })
        .catch(
          ({
            response: {
              data: { message },
            },
          }) => {
            this.errors = message[0].messages
          }
        )
        .finally(() => {
          this.submitted = false
        })
    },
  },
}
