import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  Modal,
  Nav,
  Tab,
} from "@themesberg/react-bootstrap";
import Snippet from "../components/Snippet";

const SnippetModal = (props) => {
  const { codeFlow = "", modalTitle = "" } = props;

  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const codeFlowLength = codeFlow.length;
  const threadFlow = codeFlow[0].threadFlows[0].locations;
  console.log(threadFlow);

  return (
    <>
      <Button variant="gray" size="sm" onClick={() => setShowDefault(true)}>
        Show path
      </Button>
      <Modal
        as={Modal.Dialog}
        centered
        show={showDefault}
        onHide={handleClose}
        dialogClassName="my-modal"
        size="lg"
      >
        <Tab.Container defaultActiveKey="home">
          <Modal.Title className="h6 mx-4 mt-4">
            <Row>
              <Col xs={6} className="p-3">
                <div className="h4">{codeFlowLength} paths available</div>
                <div className="h6">{modalTitle}</div>
              </Col>
              <Col xs={6} className="p-3">
                <Nav fill variant="pills" className="flex-column flex-sm-row">
                  {codeFlow.map((location, index) => {
                    return (
                      <>
                        <Nav.Item>
                          <Nav.Link
                            eventKey={index}
                            className="mb-sm-3 mb-md-0"
                          >
                            Path {index + 1}
                          </Nav.Link>
                        </Nav.Item>
                      </>
                    );
                  })}
                </Nav>
              </Col>
            </Row>
          </Modal.Title>
          <Tab.Content>
            {codeFlow.map((location, index) => {
              return (
                <>
                  <Tab.Pane eventKey={index} className="py-4">
                    <Modal.Body className="m-3">
                      {threadFlow.map((location, index) => {
                        let ploc = location.location.physicalLocation;
                        let file = ploc.artifactLocation.uri;

                        return (
                          <>
                            <div className="mb-1 h5">
                              Step {index + 1}{" "}
                              {(index === 0 && "| Source") ||
                                (index === threadFlow.length - 1 && "| Sink")}
                            </div>
                            <Card className="position-relative mb-5 shadow">
                              <Card.Body>
                                <b>
                                  <u>{file}</u>
                                </b>
                                <Snippet ploc={ploc} language="javascript" />
                              </Card.Body>
                            </Card>
                          </>
                        );
                      })}
                    </Modal.Body>
                  </Tab.Pane>
                </>
              );
            })}
          </Tab.Content>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default SnippetModal;
