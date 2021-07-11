import React from "react";
import { Alert, Row, Col, Card, Container } from "@themesberg/react-bootstrap";
import Code from "../../components/Code";

const DocsQuickStart = () => {
  return (
    <Container className="px-0">
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <article>
                <h1 className="h2" id="quick-start">
                  Getting Started
                </h1>
                <p>
                  G8, is a static code scanning security tool designed with
                  ReactJS and ExpressJS. It utilizes the CodeQL semantic code
                  analysis engine to find all variants of a vulnerability.
                </p>
                <p className="fs-5 fw-light">
                  Here is a brief summary of what you can do with G8
                </p>

                <ul className="docs-list">
                  <li>
                    Upload Projects from your harddrive or Github repos to be
                    analyzed in{" "}
                    <Card.Link href="/#/dashboard" target="_blank">
                      Dashboard
                    </Card.Link>
                  </li>
                  <li>
                    The{" "}
                    <Card.Link href="/#/overview" target="_blank">
                      Overview
                    </Card.Link>{" "}
                    tab offers a visual flow path of the project's code which
                    you have uploaded
                  </li>
                  <li>
                    View the alerts which have been generated with CodeQL after
                    analyzing your project in the{" "}
                    <Card.Link href="/#/codeql-alerts" target="_blank">
                      CodeQL Alerts
                    </Card.Link>{" "}
                    tab
                  </li>
                  <li>
                    Write your own CodeQL query and run them against your
                    project in the Custom Query page
                  </li>
                  <li>
                    An analysis report will be produced in the{" "}
                    <Card.Link href="/#/pdfgenerator" target="_blank">
                      PDF Generator
                    </Card.Link>{" "}
                    page
                  </li>
                  <li>
                    <Card.Link href="/#/sarifviewer" target="_blank">
                      Sarif Viewer
                    </Card.Link>{" "}
                    is an additional feature in G8 which can be used to view
                    Sarif files in a more read-able format
                  </li>
                  <li>
                    Query Help gives an explanation on the vulnerabilites which
                    have been found in CodeQL Alerts and also offers solution
                    concepts to it.
                  </li>
                </ul>
                <hr className="mt-5" />
                <p className="fs-5 fw-light">
                  Here is how you can get a local copy up and running follow
                  these simple example steps.
                </p>
                <h2 className="fs-5 mt-2">Dependencies</h2>
                <i>The following tools should be installed before starting:</i>
                <ul className="ps-4 docs-list">
                  <li>
                    <Card.Link
                      href="https://www.docker.com/get-started"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Docker
                    </Card.Link>
                  </li>
                </ul>
                <h2 className="fs-5 mt-4">Installation</h2>
                <p>
                  Use the provided docker configuration to deploy the project:
                </p>
                <Code code={`$ docker-compose up -d`} language="bash" />

                <h2 className="fs-5 mt-4">Development</h2>
                <ol className="ps-4 docs-list">
                  <li>
                    Install{" "}
                    <Card.Link href="#" target="_blank">
                      CodeQL
                    </Card.Link>{" "}
                    CLI
                    <ol className="ps-4 docs-list">
                      <li>Download the CodeQL CLI zip package.</li>
                      <li>
                        Create a new CodeQL directory where you can place the
                        CLI and any queries and libraries you want to use. For
                        example, /opt/codeql.
                      </li>
                      <li>
                        Extract the zip archive in the CodeQL directory;
                        /opt/codeql.
                      </li>
                      <li>
                        Add CodeQL to Path.
                        <Code
                          code={`$ export PATH=/opt/codeql:$PATH`}
                          language="bash"
                        />
                      </li>
                      <li>
                        Verify your CodeQL CLI setup.
                        <Code code={`$ codeql --help`} language="bash" />
                      </li>
                    </ol>
                  </li>
                  <li>
                    Install MariaDB & Neo4J
                    <ul className="ps-4 docs-list ">
                      <li>
                        Installation with Docker (Recommended)
                        <Code
                          code={`$ docker run -p 3306:3306 -d -v G8/backend/init.sql:/docker-entrypoint-initdb.d --env MYSQL_ROOT_PASSWORD=secret docker.io/library/mariadb:10
$ docker run -p 7474:7474 -p 7687:7687 -d -v $HOME/neo4j/data:/data --env NEO4J_AUTH=neo4j/s3cr3t neo4j:4.2.7`}
                          language="bash"
                        />
                      </li>
                      <li>
                        Install Manually
                        <ol>
                          <li>
                            Download & Install{" "}
                            <Card.Link
                              href="https://mariadb.org/download/"
                              target="_blank"
                            >
                              MariaDB
                            </Card.Link>{" "}
                            on the latest version
                          </li>
                          <li>
                            Verify MariaDB is installed by running the following
                            command
                            <Code
                              code={`$ sudo service mysql status`}
                              language="bash"
                            />
                          </li>
                          <li>
                            Download & Install{" "}
                            <Card.Link
                              href="https://neo4j.com/download-center/#community"
                              target="_blank"
                            >
                              Neo4J Community Server
                            </Card.Link>{" "}
                            on the latest version
                          </li>
                          <li>
                            Verify Neo4J is installed by visiting{" "}
                            <Card.Link
                              href="http://localhost:7474"
                              target="_blank"
                            >
                              http://localhost:7474
                            </Card.Link>
                          </li>
                        </ol>
                      </li>
                    </ul>
                  </li>

                  <li>
                    You can optionally edit the configuration file depending on
                    your needs:
                  </li>
                  <Alert className="my-4" variant="info">
                    <strong>Important!</strong> Make sure the installed Node
                    version is {`>=`} 14.0 and of npm {`>=`} 7.15.0
                  </Alert>
                  <li>
                    Setup and start the frontend
                    <Code
                      code={`$ cd G8/frontend
$ yarn install
$ yarn start`}
                      language="bash"
                    />
                  </li>
                  <li>
                    Setup and start the backend
                    <Code
                      code={`$ cd G8/backend
$ yarn install
$ yarn start`}
                      language="bash"
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
};

export default DocsQuickStart;
