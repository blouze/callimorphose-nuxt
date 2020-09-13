import groq from "groq"

export default groq`
*[_type == "page"] {
  _id, name,
  "slug": slug.current,
  pageBuilder[]-> {
    _id, name,
    "slug": slug.current,
    "image": image {
      asset,
      "dimensions": asset->metadata.dimensions
    }
  }
}`
