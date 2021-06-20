import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";

const DocsExploring = () => (
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2" id="download">
                Exploring G8{" "}
              </h1>
              <p className="fs-5 fw-light">
                This section give you a quick outline of all the things you can
                do in G8.
              </p>
              <p>
                If you have trouble interpreting your results, here is a guide
                which you can use to help you understand the different elements
                of the information.
              </p>

              {/* <ul className="docs-list">
                <li>
                  <Card.Link href="#" target="_blank">
                    Searching
                  </Card.Link>
                </li>
                <li>
                  <Card.Link href="#" target="_blank">
                    Exploring Projects
                  </Card.Link>
                </li>
                <li>
                  <Card.Link href="#" target="_blank">
                    Using the code viewer
                  </Card.Link>
                </li>
                <li>
                  <Card.Link href="#" target="_blank">
                    Exploring data flow paths
                  </Card.Link>
                </li>
              </ul> */}

            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DocsExploring;
