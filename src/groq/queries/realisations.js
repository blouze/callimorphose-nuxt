import groq from "groq"

export default groq`
*[_type == "realisation"] {
  _id, title, date,
  "images": images[] {
    asset,
    "dimensions": asset->metadata.dimensions
  }
}`
