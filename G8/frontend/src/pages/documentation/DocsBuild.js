import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";

import { CommandsTable } from "../../components/Tables";

const DocsBuild = () => (
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2" id="build-tools">
                Build tools{" "}
              </h1>
              <p className="fs-5 fw-light">
                Learn the commands that will help you work with G8 Code Scanner
                Dashboard and the commands that can build the final production
                version of your app.
              </p>

              <p className="fs-5 fw-bold">Available commands</p>
              <CommandsTable />
            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DocsBuild;
