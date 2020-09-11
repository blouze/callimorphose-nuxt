import groq from "groq"

export default groq`
*[_type == "realisation"] {
  _id, title
}`
