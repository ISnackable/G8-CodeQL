import React, { Suspense } from "react";
import { Col, Row, Container, Card } from "@themesberg/react-bootstrap";
const PDFViewer = React.lazy(() => import("../components/PDFViewer"));

const PDFGenerator = () => {
  return (
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
};

export default PDFGenerator;
