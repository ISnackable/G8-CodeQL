import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";

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
                <p className="fs-5 fw-light">
                  Here is a brief summary of what you can do with G8
                </p>
                {/* <ol className="ps-4 docs-list counter-list"> */}
                <ul className="docs-list">
                <li>
                    Upload Projects from your harddrive or Github repos to be analyzed
                    in Dashboard
                  </li>
                  <li>
                    The Overview tab offers a visual flow path of the project's
                    code which you have uploaded
                  </li>
                  <li>
                    View the alerts which have been generated with CodeQL after
                    analyzing your project in the CodeQL Alerts tab
                  </li>
                  <li>
                    Write your own CodeQL query and run them against your
                    project in the Custom Query page
                  </li>
                  <li>
                    An analysis report will be produced in the PDF Generator page
                  </li>
                  <li>
                    Sarif Viewer is an additional feature in G8 which can be used to view Sarif files in a more read-able format
                  </li>
                  <li>
                    Query Help gives an explanation on the vulnerabilites which have been found in CodeQL Alerts and also offers solution concepts to it. 
                  </li>
                </ul>
                  
                {/* </ol> */}
                {/* <p>
                  G8 provides useful insights and code quality information for
                  all sorts of people participating in software development -
                  whether you:
                </p> */}

                {/* <h2 className="fs-5 mt-4" id="using-yarn">
                  Using <code>yarn</code>
                </h2> */}
                {/* <ul className="ps-4 docs-list">
                  <li>
                    Install yarn from Use open source libraries and frameworks
                    in private projects and want to know how well they're being
                    maintained
                  </li>
                  <li>
                    <p>
                      Contribute to open source repositories and want to find
                      out about the quality of the code you contribute
                    </p> */}
                    {/* <Code code="$ yarn install" language="bash" /> */}
                  {/* </li>
                  <li>
                    <p>
                      Own or administer a public Git repository and want to
                      integrate code quality analysis into your pull request
                      review workflow
                    </p>
                  </li>
                </ul>

                <h1 className="h2 mt-4" id="">
                  {" "}
                  Exploring <code>code</code> quality
                </h1>
                <p>
                  G8 analyzes tens of thousands of repositories hosted publicly
                  on Bitbucket, GitHub or GitLab, ranging from massive projects
                  such as Apache Hadoop to small projects that are just getting
                  started. Right now G8 analyzes codebases written in
                  <code> JavaScript/TypeScript</code>
                </p>

                <p>
                  Projects are assessed for code quality, and to give you
                  insight into the impact of each contribution. Every commit to
                  a project is analyzed against a core set of queries, each of
                  which corresponds to particular aspect of coding best
                  practice. The result is data showing trends in productivity
                  and quality, which also provides fine-grained details about
                  individual contributors and individual commits.
                </p>
                <h2 className="fs-5 mt-2" id="">
                  Get started by:
                </h2>
                <ol className="ps-4 docs-list">
                  <li>
                    Searching for projects you are interested in — see&nbsp;
                    <Card.Link href="#" target="_blank">
                      Searching
                    </Card.Link>{" "} */}
                    {/* <Alert className="my-4" variant="info">
                      <strong>Important!</strong> Make sure the installed Node
                      version is {`>=`} 8.10 and of npm {`>=`} 5.6
                    </Alert> */}
                  {/* </li>
                  <li>
                    Viewing quality trends and problems in the latest revision —
                    see&nbsp;
                    <Card.Link href="#" target="_blank">
                      Exploring projects
                    </Card.Link>{" "}
                  </li>
                  <li>
                    Following projects you use or are involved with — see&nbsp;
                    <Card.Link href="#" target="_blank">
                      Personalizing content
                    </Card.Link>{" "}
                  </li>
                </ol> */}
              </article>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DocsQuickStart;
