import React from "react";
import { Row, Col, Card, Image, Container } from "@themesberg/react-bootstrap";

import dashboard1 from "../../assets/img/docImg/dashboard1.png";
import dashboard2 from "../../assets/img/docImg/dashboard2.png";
import dashboard3 from "../../assets/img/docImg/dashboard3.png";
import dashboard4 from "../../assets/img/docImg/dashboard4.png";
import dashboard5 from "../../assets/img/docImg/dashboard5.png";
import dashboard6 from "../../assets/img/docImg/dashboard6.png";
import dashboard7 from "../../assets/img/docImg/dashboard7.png";

import overview1 from "../../assets/img/docImg/overview1.png";
import overview2 from "../../assets/img/docImg/overview2.png";

import codeqlalerts1 from "../../assets/img/docImg/codeqlalerts1.png";
import codeqlalerts2 from "../../assets/img/docImg/codeqlalerts2.png";
import codeqlalerts3 from "../../assets/img/docImg/codeqlalerts3.png";
import codeqlalerts4 from "../../assets/img/docImg/codeqlalerts4.png";
import codeqlalerts5 from "../../assets/img/docImg/codeqlalerts5.png";
import codeqlalerts6 from "../../assets/img/docImg/codeqlalerts6.png";

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
              {/* In Dashboard Section */}
              <h2 className="fs-5 mt-3">In Dashboard:</h2>
              {/* ol for ordered list, classname counter-list adds the counter number to list elements below */}
              <ol className="ps-4 docs-list counter-list">
                <li>
                  <p>You can upload your projects here for analysis</p>
                  <Image
                    rounded
                    className="mb-3"
                    src={dashboard1}
                    alt="Dash Board"
                  />
                </li>
                <li>
                  <p>This is the file upload window</p>
                  <Image
                    rounded
                    className="mb-3"
                    src={dashboard2}
                    alt="Dash Board"
                  />
                  <ol className="ps-4 docs-list counter-list">
                    <li>
                      <p>
                        Click the upload bottom at the bottom of the file upload
                        window to upload files.
                      </p>
                      <Image
                        rounded
                        className="mb-3"
                        src={dashboard3}
                        alt="Dash Board"
                      />
                    </li>
                    <li>
                      <p>Wait for file uploads to be complete</p>
                    </li>
                    <li>
                      <p>
                        After "Upload complete" is shown for all files, close
                        the File Upload window
                      </p>
                    </li>
                    <li>
                      <p>
                        Wait for uploaded projects to show up under Existing
                        Projects List
                      </p>
                    </li>
                    <li>
                      <p>Click "Analyse Project"</p>
                    </li>
                    <li>
                      <p>Wait for Processing status to be complete</p>
                    </li>
                    <li>
                      <p>
                        After project is analysed, an alert message will come up
                        saying "Success. Project has been analyzed!"
                      </p>
                      <Image
                        rounded
                        className="mb-3"
                        src={dashboard4}
                        alt="Dash Board"
                      />
                    </li>
                    <li>
                      <p>Click "Load Project" afterwards</p>
                    </li>
                    <li>
                      <p>
                        Wait for a momement and an alert message will come up
                        saying "Project has been successfully loaded"
                      </p>
                      <Image
                        rounded
                        className="mb-3"
                        src={dashboard5}
                        alt="Dash Board"
                      />
                    </li>
                    <li>
                      <p>This is the Git Upload window</p>
                      <Image
                        rounded
                        className="mb-3"
                        src={dashboard6}
                        alt="Dash Board"
                      />
                    </li>
                    <li>
                      <p>Paste a Git Repo into the input provided</p>
                    </li>
                    <li>
                      <p>Click submit</p>
                    </li>
                    <li>
                      <p>
                        After submitting, an alert will come up saying "Success"
                      </p>
                      <Image
                        rounded
                        className="mb-3"
                        src={dashboard7}
                        alt="Dash Board"
                      />
                    </li>
                    <li>
                      <p>Refer to 2.5 — 2.9 to load the uploaded git repo</p>
                    </li>
                  </ol>
                </li>
              </ol>
              {/* In Overview Section */}
              {/* HR tag for nice horizonal line (mt-5) bootstrap class for margin-top: 5 */}
              <hr className="mt-5" />{" "}
              <h2 className="fs-5 mt-3">In Overview:</h2>
              <ol className="ps-4 docs-list counter-list">
                <li>
                  <p>You can view the errors, warnings and recommendations.</p>
                  <Image
                    rounded
                    className="mb-3"
                    src={overview1}
                    alt="Overview"
                  />
                </li>
                <li>
                  <p>There is also a Neo4J graph for code flow visuals</p>
                </li>
                <li>
                  <p>
                    Alerts detected together with its severity would be
                    displayed as well at the bottom of the page
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={overview2}
                    alt="Overview"
                  />
                </li>
              </ol>
              {/* In CodeQL Alerts Section */}
              <hr className="mt-5" />
              <h2 className="fs-5 mt-3">In CodeQL Alerts:</h2>
              <ol className="ps-4 docs-list counter-list">
                <li>
                  <p>Files that have vulnerabilities are listed here</p>
                  <Image
                    rounded
                    className="mb-3"
                    src={codeqlalerts1}
                    alt="CodeQL Alerts"
                  />
                </li>
                <li>
                  <p>There is also a Neo4J graph for code flow visuals</p>
                </li>
                <li>
                  <p>
                    You can view the explanation behind the alert when you click
                    the downward arrow
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={codeqlalerts2}
                    alt="CodeQL Alerts"
                  />
                </li>
                <li>
                  <p>You can view the path as well</p>
                </li>
                <li>
                  <p>Click "Show path"</p>
                  <Image
                    rounded
                    className="mb-3"
                    src={codeqlalerts3}
                    alt="CodeQL Alerts"
                  />
                </li>
                <li>
                  <p>
                    There will be a number of paths shown. Choose a path you'd
                    like to view.
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={codeqlalerts4}
                    alt="CodeQL Alerts"
                  />
                </li>
                <li>
                  <p>
                    Upon clicking a path, you will be shown the steps from the
                    source to the sink
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={codeqlalerts5}
                    alt="CodeQL Alerts"
                  />
                  <Image
                    rounded
                    className="mb-3"
                    src={codeqlalerts6}
                    alt="CodeQL Alerts"
                  />
                </li>
              </ol>
            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DocsExploring;
