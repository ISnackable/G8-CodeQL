import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";

const DocsAbout = () => (
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2" id="overview">
                About G8{" "}
              </h1>
              {/* <p className="fs-5 fw-light">
                Download files for Volt React Dashboard
              </p> */}
              <h2 className="mt-2" id="">
                Why use G8?
              </h2>
              <p>
                Source codes are an integral part of any technological device in
                the world. From routers, switches to smart home systems, the
                implementation of the codes shape the usability of the devices.
                However, such source codes might be at risk of the lurking
                threats of bugs and cyber-attacks in the cyberspace due to the
                loopholes in certain parts of the code. Fixing these loopholes
                is a tiring, tedious and mind-boggling process which we, at G8,
                aim to resolve using our automatic tool.
              </p>

              <h2 className="mt-2" id="">
                How to use G8?
              </h2>
              <p>
                Source codes are an integral part of any technological device in
                the world. From routers, switches to smart home systems, the
                implementation of the codes shape the usability of the devices.
                However, such source codes might be at risk of the lurking
                threats of bugs and cyber-attacks in the cyberspace due to the
                loopholes in certain parts of the code. Fixing these loopholes
                is a tiring, tedious and mind-boggling process which we, at G8,
                aim to resolve using our automatic tool.
              </p>
              <p>
                G8 is powered by <code>CodeQl</code>, a code scanning engine
                which allows queries to be written in order to find the bugs in
                the code. After finding the issue, you can repair the code by
                using the provided solutions to save you some time. Once the
                code is fixed, you can also apply the same solution to the other
                vulnerabilities of the same kind.
              </p>
              <p>
                All the queries in G8 are customized to fit the different CVEs
                in the list and are constantly updated to match the ever-growing
                list. Securing code is an important step in the code development
                process, and we want to be part of that step to bring your code
                to greater heights.
              </p>

              <h2 className="fs-5 mt-2" id="">
                Supported file formats:
              </h2>

              <ul className="docs-list">
                <li>.js files</li>
                <li>Github repository links</li>
              </ul>

              <h2 className="fs-5 mt-2" id="">
                Supported languages:
              </h2>

              <ul className="docs-list">
                <li>JavaScript/TypeScript</li>
              </ul>

              <h2 id="getting-support">Privacy and Security</h2>
              <p>
                When the codes are being put through our scanner, it is our
                policy to not store, or reproduce the information in any way
                possible.
              </p>
            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DocsAbout;
