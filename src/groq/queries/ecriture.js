import groq from "groq"

export default groq`
*[_type == "ecriture" && slug.current == $slug] {
  _id, name, description,
  "slug": slug.current,
  "image": image {
    asset,
    "dimensions": asset->metadata.dimensions
  },
  "realisations": *[_type == "realisation" && ^._id in ecritures[]._ref] {
    _id, title,
    "images": images[] {
      asset,
      "dimensions": asset->metadata.dimensions
    }
  }
}[0]`
