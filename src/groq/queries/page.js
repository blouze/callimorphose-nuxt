import groq from "groq"

export default groq`
*[_type == "page" && slug.current == $slug] {
  _id, name,
  "slug": slug.current,
  meta[],
  pageBuilder[]-> {
    _id, name,
    "slug": slug.current,
    "image": image {
      asset,
      "dimensions": asset->metadata.dimensions
    }
  }
}[0]`
