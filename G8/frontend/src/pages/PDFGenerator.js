import React, { Suspense } from "react";
import { Routes } from "../routes";
import { Link } from "react-router-dom";
import { Col, Row, Container, Card, Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import useLocalStorageState from "use-local-storage-state";
const PDFViewer = React.lazy(() => import("../components/PDFViewer"));

const PDFGenerator = () => {
  // eslint-disable-next-line no-unused-vars
  const [logs, setLogs] = useLocalStorageState("log", []);
  // eslint-disable-next-line no-unused-vars
  const [projectInfo, setProjectInfo] = useLocalStorageState("projectInfo", []);

  const NoLogResults = () => (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>No Projects were found!</Card.Title>
        <Card.Text>Click the button below to upload a new project :)</Card.Text>
        <Button
          variant="secondary"
          as={Link}
          to={Routes.Dashboard.path}
          className="text-dark me-3"
        >
          Upload New Project{" "}
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="d-none d-sm-inline ms-1"
          />
        </Button>
      </Card.Body>
    </Card>
  );

  const PDFFrame = () => (
    <Suspense
      fallback={
        <Container className="px-0">
          <Row>
            <Col xs={12} className="p-3">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Generating PDF Document</Card.Title>
                  <Card.Text>
                    Please hold on while G8 is generating the document.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      }
    >
      <PDFViewer />
    </Suspense>
  );

  return (
    <>
      {(!logs.length && logs[0]?.runs[0]?.results === undefined) ||
      logs[0]?.runs[0]?.tool.driver.name !== "CodeQL" ||
      !projectInfo.length ? (
        <Container className="px-0">
          <Row>
            <Col xs={12} className="p-3">
              <NoLogResults />
            </Col>
          </Row>
        </Container>
      ) : (
        <PDFFrame />
      )}
    </>
  );
};

export default PDFGenerator;
