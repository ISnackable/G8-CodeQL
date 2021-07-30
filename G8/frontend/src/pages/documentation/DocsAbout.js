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

              <h2 id="" className="mt-5">
                How to use G8?
              </h2>
              <p>
                G8 is powered by <code>CodeQL</code>, a code scanning engine
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
                <li>.js/.ts files</li>
                <li>Github repository links</li>
              </ul>

              <h2 className="fs-5 mt-2" id="">
                Supported languages:
              </h2>

              <ul className="docs-list">
                <li>JavaScript/TypeScript</li>
              </ul>

              <h2 id="getting-support" className="mt-5">License</h2>
              <p>
                The version of CodeQL used by the G8 is subject to the{" "}
                <Card.Link
                  href="https://securitylab.github.com/tools/codeql/license"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CodeQL Research Terms & Conditions
                </Card.Link>.{" "}
                By using G8, you agree to GitHub CodeQL Terms and Conditions.
                If you do not accept these Terms, do not download, install, use, or copy
                the Software.
              </p>

              <h2 id="getting-support" className="mt-5">Privacy and Security</h2>
              <p>
                When the codes are being put through our scanner, it is our
                policy for the user to manage their data. All information can
                be deleted by the user.
              </p>

              <h2 id="getting-support" className="mt-5">Acknowledgement</h2>
              <p>
                All images and code are used purely for educational purposes.
              </p>
              <ul>
                <li>
                  <Card.Link
                    href="https://securitylab.github.com/tools/codeql/license"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CodeQL
                  </Card.Link>
                </li>
                <li>
                  <Card.Link
                    href="https://github.com/github/vscode-codeql/blob/main/extensions/ql-vscode/media/VS-marketplace-CodeQL-icon.png"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CodeQL Logo
                  </Card.Link>
                </li>
                <li>
                  <Card.Link
                    href="https://securitylab.github.com/tools/codeql/license"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Themesberg Volt React Dashboard
                  </Card.Link>
                </li>
                <li>
                  <Card.Link
                    href="https://securitylab.github.com/tools/codeql/license"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sarif Web Component
                  </Card.Link>
                </li>
                <li>
                  <Card.Link
                    href="https://freebiesupply.com/logos/neo4j-logo/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Neo4J Logo
                  </Card.Link>
                </li>
                <li>
                  <Card.Link
                    href="https://codersera.com/blog/learn-express-js/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ExpressJS Logo
                  </Card.Link>
                </li>
              </ul>
            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DocsAbout;
