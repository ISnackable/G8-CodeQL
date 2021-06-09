import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";

const DocsFAQ = () => (
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2" id="license">
                FAQ
              </h1>
              <p className="fs-5 fw-light">
                We know you might have questions regarding the tool, here is a
                list of the most common questions asked and our answers to them.
              </p>
              <h2 className="fs-5 mt-2" id="">
                How can I upload my source code for scanning?
              </h2>
              <p>
                You can head over to the query page, and choose whether you want
                to upload a file, folder, or even a Github Repository link. You
                can then browse your local files or drag and drop the file into
                the space provided and the scan will start running.
              </p>
            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DocsFAQ;
