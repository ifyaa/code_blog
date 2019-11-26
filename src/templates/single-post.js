import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Badge, Card, CardBody, CardSubtitle } from "reactstrap"
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"
import { slugify } from "../util/utilityFunctions"
import authors from "../util/authors"
import { DiscussionEmbed } from "disqus-react"

const SinglePost = ({ data, pageContext }) => {
  // if (!props) return null
  const post = data.markdownRemark.frontmatter
  const author = authors.find(x => x.name === post.author)
  const baseUrl = "https://getsbytutorial.co.uk/"
  // console.log("the coming data: " + JSON.stringify(props))
  // console.log("the author : " + JSON.stringify(author))

  const disqusShortName = "gCode"
  const disqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug,
  }
  return (
    <Layout
      pageTitle={post.title}
      postAuthor={author}
      authorImageFluid={data.file.childImageSharp.fluid}
    >
      <SEO title={post.title}></SEO>

      <Card>
        <Img
          className="card-image-top"
          fluid={post.image.childImageSharp.fluid}
        ></Img>
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.data}</span> by{" "}
            <span className="text-info">{post.author}</span>
          </CardSubtitle>
          <div
            dangerouslySetInnerHTML={{
              __html: data.markdownRemark.html,
            }}
          />
          <ul className="post-tags">
            {post.tags.map(tag => (
              <li key={tag}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary">{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
      <h3 className="text-center">Share this post</h3>
      <div className="text-center social-share-links">
        <ul>
          <li>
            <a
              href={
                "https://www.facebook.com/sharer/sharer.php?u=" +
                baseUrl +
                pageContext.slug
              }
              className="facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-2x fa-facebook"></i>
            </a>
          </li>
          <li>
            <a
              href={
                "https://twitter.com/share?url=" +
                baseUrl +
                pageContext.slug +
                "&text=" +
                post.title +
                "&via" +
                "twitterHandle"
              }
              className="twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-2x fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href={
                "https://www.linkedin.com/shareArticle?mini=true&url=" +
                baseUrl +
                pageContext.slug
              }
              className="linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-2x fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
      <DiscussionEmbed
        shortname={disqusShortName}
        config={disqusConfig}
      ></DiscussionEmbed>
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $imageUrl: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        date(formatString: "MMM Do YYYY")
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default SinglePost
