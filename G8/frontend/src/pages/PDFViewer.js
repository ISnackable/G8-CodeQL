import React from "react";
import { Col, Row, Container } from "@themesberg/react-bootstrap";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../components/CodeQLAlertPDF";
import useLocalStorageState from "use-local-storage-state";

const CodeQLAlerts = () => {
  const [logs, setLogs] = useLocalStorageState("logs", []);

  return (
    <Container className="px-0">
      <Row>
        <Col xs={12} className="p-3">
          <PDFViewer style={{ width: "100%", height: "100em" }}>
            <MyDocument />
          </PDFViewer>
          <div id="temp-snippet">Loading Snippets...</div>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeQLAlerts;
