import groq from "groq"

export default groq`
*[_type == "ecriture" && slug.current == $slug] {
  _id, name,
  "slug": slug.current,
  "image": image.asset
}[0]`
