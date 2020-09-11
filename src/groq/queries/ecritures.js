import groq from "groq"

export default groq`
*[_type == "ecriture"] {
  _id, name,
  "slug": slug.current,
  "image": image {
    asset,
    "dimensions": asset->metadata.dimensions
  }
}`
