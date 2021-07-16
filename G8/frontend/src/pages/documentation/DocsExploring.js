import React from "react";
import { Row, Col, Card, Image, Container } from "@themesberg/react-bootstrap";
import ReactMarkdown from "react-markdown";
import Code from "../../components/Code";

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
import codeqlalerts7 from "../../assets/img/docImg/codeqlalerts7.png";

import customquery1 from "../../assets/img/docImg/customquery1.png";
import customquery2 from "../../assets/img/docImg/customquery2.png";
import customquery3 from "../../assets/img/docImg/customquery3.png";
import customquery4 from "../../assets/img/docImg/customquery4.png";
import customquery5 from "../../assets/img/docImg/customquery5.jpeg";

import pdf1 from "../../assets/img/docImg/pdf1.png";

import sarifviewer1 from "../../assets/img/docImg/sarifviewer1.png";
import sarifviewer2 from "../../assets/img/docImg/sarifviewer2.png";
import sarifviewer3 from "../../assets/img/docImg/sarifviewer3.png";
import sarifviewer4 from "../../assets/img/docImg/sarifviewer4.png";

import queryhelp1 from "../../assets/img/docImg/queryhelp1.png";

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <Code code={String(children).replace(/\n$/, "")} language={match[1]} />
    ) : (
      // <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

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
                This section gives you an elaborate outline of all the things
                you can do in G8.
              </p>
              {/* <p>
                If you have trouble interpreting your results, here is a guide
                which you can use to help you understand the different elements
                of the information.
              </p> */}
              {/* <ul className="docs-list">
                <li>
                  <Card.Link href="#" target="_blank" rel="noopener noreferrer">
                    Searching
                  </Card.Link>
                </li>
                <li>
                  <Card.Link href="#" target="_blank" rel="noopener noreferrer">
                    Exploring Projects
                  </Card.Link>
                </li>
                <li>
                  <Card.Link href="#" target="_blank" rel="noopener noreferrer">
                    Using the code viewer
                  </Card.Link>
                </li>
                <li>
                  <Card.Link href="#" target="_blank" rel="noopener noreferrer">
                    Exploring data flow paths
                  </Card.Link>
                </li>
              </ul> */}
              {/* In Dashboard Section */}
              <h2 className="docs-list fs-5 mt-3">
                <li>
                  In&nbsp;
                  <Card.Link
                    href="/#/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dashboard
                  </Card.Link>
                  :{" "}
                </li>
              </h2>
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
              <h2 className="docs-list fs-5 mt-3">
                <li>
                  In&nbsp;
                  <Card.Link
                    href="/#/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Overview
                  </Card.Link>
                  :{" "}
                </li>
              </h2>
              <ol className="ps-4 docs-list counter-list">
                <li>
                  <p>
                    You can view the number of errors, warnings and
                    recommendations.
                  </p>
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
              <h2 className="docs-list fs-5 mt-3">
                <li>
                  In&nbsp;
                  <Card.Link
                    href="/#/codeql-alerts"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CodeQL Alerts
                  </Card.Link>
                  :{" "}
                </li>
              </h2>
              <ol className="ps-4 docs-list counter-list">
                <li>
                  <p>
                    If your project is vulnerability-free, the following page is
                    shown
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={codeqlalerts7}
                    alt="Dash Board"
                  />
                </li>

                <li>
                  <p>Files that have vulnerabilities are listed here</p>
                  <Image
                    rounded
                    className="mb-3"
                    src={codeqlalerts1}
                    alt="CodeQL Alerts"
                  />
                </li>
                <ol className="ps-4 docs-list counter-list">
                  <li>
                    <p>
                      You can view the explanation behind the alert when you
                      click the downward arrow
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
              </ol>
              {/* In Custom Query Section */}
              <hr className="mt-5" />
              <h2 className="docs-list fs-5 mt-3">
                <li>
                  In&nbsp;
                  <Card.Link
                    href="/#/codeql-alerts"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Custom Query
                  </Card.Link>
                  :{" "}
                </li>
              </h2>
              <ol className="ps-4 docs-list counter-list">
                <li>
                  <p>
                    Choose a project which you wish to run a customised query on
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={customquery1}
                    alt="customquery1"
                  />
                </li>
                <li>
                  <p>Write your custom query here</p>
                  <Image
                    rounded
                    className="mb-3"
                    src={customquery2}
                    alt="customquery2"
                  />
                </li>
                <li>
                  <p>After writing it, click run</p>
                  <Image
                    rounded
                    className="mb-3"
                    src={customquery3}
                    alt="customquery3"
                  />
                </li>
                <li>
                  <p>
                    Wait for the following alert message to come up and click ok
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={customquery4}
                    alt="customquery4"
                  />
                </li>
                <li>
                  <p>
                    Proceed to view the analysis in the Sarif Viewer page or the
                    CodeQL Alerts page
                  </p>
                </li>
                <li>
                  <p>
                    There is also a button for a user to download a CodeQL database snapshot for offline querying
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={customquery5}
                    alt="customquery5"
                  />
                </li>
              </ol>
              {/* PDF Generator */}
              <hr className="mt-5" />
              {/* <h2 className="fs-5 mt-3">In PDF Generator:</h2> */}
              <h2 className="docs-list fs-5 mt-3">
                <li>
                  In&nbsp;
                  <Card.Link
                    href="/#/pdfgenerator"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PDF Generator
                  </Card.Link>
                  :{" "}
                </li>
              </h2>
              <ol className="ps-4 docs-list counter-list">
                <li>
                  <p>
                    A report of the vulnerabilities which have been found in the
                    analyzed project is produced here
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={pdf1}
                    alt="CodeQL Alerts"
                  />
                </li>
                <li>
                  You can zoom in or zoom out from the report, download the
                  report or print it
                </li>
              </ol>
              {/* Sarif Viewer */}
              <hr className="mt-5" />
              <h2 className="docs-list fs-5 mt-3">
                <li>
                  In&nbsp;
                  <Card.Link
                    href="/#/sarifviewer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sarif Viewer
                  </Card.Link>
                  :{" "}
                </li>
              </h2>
              <ol className="ps-4 docs-list counter-list">
                <li>
                  <p>
                    The Sarif Viewer page provides a convenient UI for analyzing
                    static analysis log files
                  </p>
                </li>
                <li>
                  <p>
                    You can click on the "Edit" button at the top left to
                    upload/remove the log files.
                  </p>
                  <p>
                    <b>
                      <i>Note: You can also drag & drop a sarif file.</i>
                    </b>
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={sarifviewer1}
                    alt="CodeQL Alerts"
                  />
                </li>
                <li>
                  <p>
                    There is a search bar which allows a user to quickly find
                    keywords in the sarif file
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={sarifviewer2}
                    alt="CodeQL Alerts"
                  />
                </li>
                <li>
                  <p>
                    User can also use the filter to limit the sarif results to a
                    certain baseline or levels
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={sarifviewer3}
                    alt="CodeQL Alerts"
                  />
                </li>
                <li>
                  <p>
                    At the top right, there is an export button which allows a
                    user to download the sarif file(s).
                  </p>
                  <Image
                    rounded
                    className="mb-3"
                    src={sarifviewer4}
                    alt="CodeQL Alerts"
                  />
                </li>
              </ol>
              {/* Query Help */}
              <hr className="mt-5" />
              <h2 className="fs-5 mt-3">In Query Help:</h2>
              <ol className="ps-4 docs-list counter-list">
                <li>
                  <p>
                    A more elaborate explanation of the vulnerabilties scanned
                    can be seen here
                  </p>
                </li>
                <li>
                  <p>You can refer to these to make your code more secure</p>
                  <Image
                    rounded
                    className="mb-3"
                    src={queryhelp1}
                    alt="CodeQL Alerts"
                  />
                </li>
                <li>
                  As seen from the example:{" "}
                  <Card.Link
                    href="/#/query-help/94"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://localhost:3000/#/query-help/94
                  </Card.Link>
                  <Card className="p-4">
                    <ReactMarkdown
                      components={components}
                      children={`# Uncontrolled command line
Code that passes user input directly to \`require('child_process').exec\`, or some other library routine that executes a command, allows the user to execute malicious code.


## Recommendation
If possible, use hard-coded string literals to specify the command to run or library to load. Instead of passing the user input directly to the process or library function, examine the user input and then choose among hard-coded string literals.

If the applicable libraries or commands cannot be determined at compile time, then add code to verify that the user input string is safe before using it.


## Example
The following example shows code that takes a shell script that can be changed maliciously by a user, and passes it straight to \`child_process.exec\` without examining it first.


~~~javascript
var cp = require("child_process"),
    http = require('http'),
    url = require('url');

var server = http.createServer(function(req, res) {
    let cmd = url.parse(req.url, true).query.path;

    cp.exec(cmd); // BAD
});

~~~

## References
* OWASP: [Command Injection](https://www.owasp.org/index.php/Command_Injection).
* Common Weakness Enumeration: [CWE-78](https://cwe.mitre.org/data/definitions/78.html).
* Common Weakness Enumeration: [CWE-88](https://cwe.mitre.org/data/definitions/88.html).
`}
                    />
                  </Card>
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
