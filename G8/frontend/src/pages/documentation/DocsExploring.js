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

            </article>
        
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body>
          <p>
                In Dashboard:
                </p>
                <p>
            1. You can upload your projects here for analysis
          </p>
<Image src={dashboard1} alt="Dash Board"/>
<p>
</p>
<p>
            2. This is the file upload window
          </p>
          <Image src={dashboard2} alt="Dash Board"/>
<p>
</p>
          <p>
            2.01 Click the upload bottom at the bottom of the file upload window to upload files.
            </p>
            <Image src={dashboard3} alt="Dash Board"/>
            <p>
</p>

<p>
            2.02 Wait for file uploads to be complete
            </p>
            <p>
            2.03 After "Upload complete" is shown for all files, close the File Upload window
            </p>
            <p>
            2.04 Wait for uploaded projects to show up under Existing Projects List
            </p>
            <p>
            2.05 Click "Analyse Project"
            </p>
            <p>
            2.06 Wait for Processing status to be complete
            </p>
            <p>
            2.07 After project is analysed, an alert message will come up saying "Success. Project has been analyzed!"
            </p>
            <Image src={dashboard4} alt="Dash Board"/>
            <p>
</p>
<p>
            2.08 Click "Load Project" afterwards
            </p>
            <p>
            2.09 Wait for a momement and an alert message will come up saying "Project has been successfully loaded"
            </p>
            <Image src={dashboard5} alt="Dash Board"/>
            <p>
            </p>
            <p>
            3. This is the Git Upload window
            </p>
            <Image src={dashboard6} alt="Dash Board"/>
            <p>
            </p>
            <p>
              3.01 Paste a Git Repo into the input provided
            </p>
            <p>
              3.02 Click submit
            </p>
            <p>
              3.03 After submitting, an alert will come up saying "Success"
            </p>
            <Image src={dashboard7} alt="Dash Board"/>
            <p>
            </p>
            <p>
              3.04 Refer to 2.05-2.09 to load the uploaded git repo 
            </p>

          </Card.Body>
          </Card>

          <Card>
          <Card.Body>
          <p>
                In Overview:
                </p>
                <p>
            1. You can view the errors, warnings and recommendations. 
            2. There is also a Neo4J graph for code flow visuals
          </p>
<Image src={overview1} alt="Overview"/>
<p>
</p>
<p>
  3. Alerts detected together with its severity would be displayed as well at the bottom of the page
</p>
<Image src={overview2} alt="Overview"/>
          
          </Card.Body>
          </Card>

      </Col>
    </Row>

    <Row>
      <Col>
      <Card>
        <Card.Body>
          <p>
            In CodeQL Alerts:
          </p>
          <p>
            1. Files that have vulnerabilities are listed here
          </p>
          <Image src={codeqlalerts1} alt="CodeQL Alerts"/>
          <p>
          </p>
          <p>
            2. You can view the explanation behind the alert when you click the downward arrow
          </p>
          <Image src={codeqlalerts2} alt="CodeQL Alerts"/>
<p>
</p>
<p>
  3. You can view the path as well
</p>
<p>
4. Click "Show path"
</p>
<Image src={codeqlalerts3} alt="CodeQL Alerts"/>
<p></p>
<p>
  5. There will be a number of paths shown. Choose a path you'd like to view. 
</p>
<Image src={codeqlalerts4} alt="CodeQL Alerts"/>
<p></p>
<p>
  6. Upon clicking a path, you will be shown the steps from the source to the sink
</p>
<Image src={codeqlalerts5} alt="CodeQL Alerts"/>
<Image src={codeqlalerts6} alt="CodeQL Alerts"/>


        </Card.Body>
      </Card>
      </Col>

  </Row>
  </Container>
);

export default DocsExploring;
