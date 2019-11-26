import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Card, CardTitle, CardBody, CardText } from "reactstrap"
import Img from "gatsby-image"
import { Link } from "gatsby"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import SubscribeForm from "./subscribeForm"
const url =
  "https://gmail.us3.list-manage.com/subscribe/post?u=4fb7309bfc0f2343fd5182b5f&amp;id=f8ce551596"

const Sidebar = ({ author, authorFluid }) => (
  <div>
    {author && (
      <Card>
        <Img className="card-image-top" fluid={authorFluid}></Img>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            {author.name}
          </CardTitle>
          <CardText>{author.bio}</CardText>
          <div className="author-social-links text-center">
            <ul>
              <li>
                <a
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                >
                  <i className="fa fa-2x fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter"
                >
                  <i className="fa fa-2x fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin"
                >
                  <i className="fa fa-2x fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <i className="fa fa-2x fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    )}
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase mb-3">
          Newsletter
        </CardTitle>

        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <SubscribeForm
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          )}
        />
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase ">
          Advertisement
        </CardTitle>
        <img
          src="https://via.placeholder.com/320x200"
          alt="advert"
          style={{ width: "100%" }}
        ></img>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase mb-3">
          Recent Posts
        </CardTitle>
        <StaticQuery
          query={sidebarQyery}
          render={data => (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <Card key={node.id}>
                  <Link to={node.fields.slug}>
                    <Img
                      className="card-image-top"
                      fluid={node.frontmatter.image.childImageSharp.fluid}
                    ></Img>
                  </Link>
                  <CardBody>
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        >
          {" "}
        </StaticQuery>
      </CardBody>
    </Card>
  </div>
)

const sidebarQyery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
export default Sidebar
