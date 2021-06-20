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
                You can head over to the Overview tab, and choose whether you want
                to upload a file, folder, or even a Github Repository link. You
                can then browse your local files or drag and drop the file into
                the space provided. The scan will only start running after you click upload or submit.
              </p>

              <h2 className="fs-5 mt-2" id="">
              What happens to the code after I have analyzed them?
              </h2>
              <p>
                We have made it convenient for you such that you get 
                to decide whether your code can be deleted or whether you still 
                need to refer to it on G8. 
              </p>

              <h2 className="fs-5 mt-2" id="">
              Is there a page which can help me better understand the complicated terms used in G8.
              </h2>
              <p>
                Yes there is a Glossary page under the Documentation tab which you can refer to for terms which you are unsure of. 
              </p>

              <h2 className="fs-5 mt-2" id="">
              How do I delete the code I have uploaded and analyzed?
              </h2>
              <p>
                TBC 
              </p>

              <h2 className="fs-5 mt-2" id="">
              Can I use G8 on my mobile phone or Tablet?
              </h2>
              <p>
                TBC
              </p>

              <h2 className="fs-5 mt-2" id="">
              Can I use G8 on any Operating System?
              </h2>
              <p>
                TBC
              </p>

            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DocsFAQ;
