import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import authors from "../util/authors"
import { Card, CardBody, CardTitle, Button, CardText, Row } from "reactstrap"
import JohnImage from "../images/john.jpg"
import JonathImage from "../images/jonath.jpg"
import AmrImage from "../images/amr.png"
import { slugify } from "../util/utilityFunctions"
const TeamPage = () => (
  <Layout pageTitle="Our Team">
    <SEO title="Team" keywords={[`gatsby`, `application`, `react`]} />
    <Row className="mb-4">
      <div className="col-md-3">
        <img
          src={JohnImage}
          style={{ maxWidth: "100%" }}
          alt="john profile"
        ></img>
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: "100%" }}>
          <CardBody>
            <CardTitle>{authors[0].name}</CardTitle>
            <CardText>{authors[0].bio}</CardText>
            <Button
              className="text-uppercase"
              color="primary"
              href={`/author/${slugify(authors[0].name)}`}
            >
              View posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
    <Row className="mb-4">
      <div className="col-md-3">
        <img
          src={JonathImage}
          style={{ maxWidth: "100%" }}
          alt="jonath profile"
        ></img>
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: "100%" }}>
          <CardBody>
            <CardTitle>{authors[1].name}</CardTitle>
            <CardText>{authors[1].bio}</CardText>
            <Button
              className="text-uppercase"
              color="primary"
              href={`/author/${slugify(authors[1].name)}`}
            >
              View posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>

    <Row className="mb-4">
      <div className="col-md-3">
        <img
          src={AmrImage}
          style={{ maxWidth: "100%" }}
          alt="Amr profile"
        ></img>
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: "100%" }}>
          <CardBody>
            <CardTitle>{authors[2].name}</CardTitle>
            <CardText>{authors[2].bio}</CardText>
            <Button
              className="text-uppercase"
              color="primary"
              href={`/author/${slugify(authors[2].name)}`}
            >
              View posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
)

export default TeamPage
