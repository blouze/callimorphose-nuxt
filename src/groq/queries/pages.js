import groq from "groq"

export default groq`
*[_type == "page"] {
  _id, name,
  "slug": slug.current
}`
