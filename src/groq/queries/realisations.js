import groq from "groq"

export default groq`
*[_type == "realisation"] | order(date desc) {
  _id, title, date,
  "images": images[] {
    asset,
    "dimensions": asset->metadata.dimensions
  }
}`
