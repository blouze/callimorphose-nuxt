import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export default (context, inject) => {
  const client = sanityClient({
    projectId: context.env.SANITY_PROJECT_ID,
    dataset: context.env.SANITY_DATASET,
    useCdn: true,
  })

  inject("sanity", client)
  inject("imgBuilder", imageUrlBuilder(client))
}
