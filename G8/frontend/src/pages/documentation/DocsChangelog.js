import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";

const DocsChangelog = () => (
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2" id="changelog">
                Changelog{" "}
              </h1>
              <p className="fs-5 fw-light">
                This is the changelog for the new features and bug fixes for G8
                Code Scanner
              </p>

              <p className="fs-5 fw-bold">Version 1.0.0 - June 8, 2021</p>
              <ul className="docs-list">
                <li>Initial release files</li>
              </ul>
            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DocsChangelog;
