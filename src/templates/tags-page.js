import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Badge, Button } from "reactstrap"
import { slugify } from "../util/utilityFunctions"

const tagsPage = ({ pageContext }) => {
  const { tagPostCounts, tags } = pageContext
  console.log("here is the pageContext :" + JSON.stringify(pageContext))
  console.log("here is the tags :" + JSON.stringify(tags))
  console.log("here is the tagPostCounts :" + JSON.stringify(tagPostCounts))
  return (
    <Layout pageTitle="All tags">
      <SEO title="All tags" keywords={["tags", "topics"]}></SEO>
      <ul>
        {tags.map(tag => (
          <li key={tag} style={{ marginBottom: "10px" }}>
            <Button color="primary" href={`/tag/${slugify(tag)}`}>
              {tag} <Badge color="light">{tagPostCounts[tag]}</Badge>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default tagsPage
