import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import React FilePond
import { FilePond } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import axios from "axios";
import {
  faCashRegister,
  faChartLine,
  faCloudUploadAlt,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
  Modal,
  Form,
} from "@themesberg/react-bootstrap";

import {
  CounterWidget,
  CircleChartWidget,
  // BarChartWidget,
  // TeamMembersWidget,
  // ProgressTrackWidget,
  // RankingWidget,
  SalesValueWidget,
  // SalesValueWidgetPhone,
  // AcquisitionWidget,
} from "../../components/Widgets";
import {
  PageVisitsTable,
  PageTrafficTable,
  RankingTable,
  TransactionsTable,
  CommandsTable,
} from "../../components/Tables";
import { trafficShares } from "../../data/charts";
import Progress from "../../components/Progress";
// import Code from "../../components/Code";

export default () => {
  const filePondRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [fileUploadPending, setFileUploadPending] = useState(true);
  const [fileUploadProgress, setFileUploadProgress] = useState("0");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleChangeGit = (event) => {
    const gitRegex = new RegExp(
      "^((http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?$"
    );

    if (gitRegex.test(event.target.value)) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  const handleShowModalOne = () => {
    setModalState("modal-one");
  };

  const handleShowModalTwo = () => {
    setModalState("modal-two");
  };

  const handleClose = () => {
    setModalState("close");
  };

  // maybe just stick with normal 1 by 1 upload instead of all at once.
  // size of request is very large
  const handleUpload = () => {
    // console.log(files);
    if (!files.length) return;

    const pond = filePondRef.current;

    // const formData = new FormData();
    // files.forEach((file) => {
    //   formData.append("file", file, file._relativePath || file.name);
    // });
    // axios({
    //   url: `http://localhost:8080/upload`,
    //   method: "POST",
    //   data: formData,
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("error");
    //   });

    // setFiles([]); // remove all files after uploaded
    // setTimeout(() => {
    //   setModalState("close");
    // }, 1000);

    // upload/process all files all once
    // pond.processFiles().then((files) => {
    //   console.log(files);
    // });

    // upload/process a single file
    pond.processFile().then((file) => {
      // File has been processed/uploaded

      setFileUploadProgress((fileUploadProgress + 1 / files.length) * 100);
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle
            as={Button}
            variant="primary"
            size="sm"
            className="me-2"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />{" "}
              Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview
              Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" />{" "}
              Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ButtonGroup>
          <Button variant="outline-primary" size="sm">
            Share
          </Button>
          <Button variant="outline-primary" size="sm">
            Export
          </Button>
        </ButtonGroup>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={6} sm={6} className="mb-4">
          <Button
            variant="primary"
            className="my-3 h-100 btn-block"
            onClick={handleShowModalOne}
          >
            <FontAwesomeIcon icon={faFolder} className="me-2" />
            Upload Folder
          </Button>

          <Modal
            dialogClassName="my-modal"
            size="lg"
            as={Modal.Dialog}
            centered
            show={modalState === "modal-one"}
            onHide={handleClose}
          >
            <Modal.Header>
              <Modal.Title className="h6">File Upload</Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose}
              />
            </Modal.Header>
            <Modal.Body>
              <Progress variant="info" value={fileUploadProgress} />
              <FilePond
                ref={filePondRef}
                files={files}
                allowProcess={false}
                instantUpload={false}
                allowMultiple={true}
                maxFiles={100}
                onwarning={(error, file, status) => {
                  if (error) {
                    alert("something went wrong!");
                    console.log(error);
                    console.log(file);
                    console.log(status);
                  }
                }}
                // server="http://localhost:8080/api"
                name="files"
                onupdatefiles={(fileItems) => {
                  // Set currently active file objects to this.state
                  setFileUploadPending(false);
                  setFiles(fileItems.map((fileItem) => fileItem.file));
                }}
                onprocessfilestart={(file) => {
                  console.log(file);
                }}
                // allowFileTypeValidation={true}
                // acceptedFileTypes={[
                //   "text/javascript",
                //   "application/zip",
                //   "application/x-7z-compressed",
                // ]}
                dropValidation={true}
                ignoredFiles={[".ds_store", "thumbs.db", "desktop.ini"]}
                server={{
                  process: (
                    fieldName,
                    file,
                    metadata,
                    load,
                    error,
                    progress,
                    abort,
                    transfer,
                    options
                  ) => {
                    // set data
                    const formData = new FormData();
                    formData.append(
                      "file",
                      file,
                      file._relativePath !== "" || file.name
                    );

                    // related to aborting the request
                    const CancelToken = axios.CancelToken;
                    const source = CancelToken.source();

                    // the request itself
                    axios({
                      method: "post",
                      url: "http://localhost:8080/upload",
                      data: formData,
                      cancelToken: source.token,
                      onUploadProgress: (e) => {
                        // updating progress indicator
                        progress(e.lengthComputable, e.loaded, e.total);
                      },
                    })
                      .then((response) => {
                        // passing the file id to FilePond
                        load(response.data.data.id);
                      })
                      .catch((thrown) => {
                        if (axios.isCancel(thrown)) {
                          console.log("Request canceled", thrown.message);
                        } else {
                          // handle error
                        }
                      });

                    // Setup abort interface
                    return {
                      abort: () => {
                        source.cancel("Operation canceled by the user.");
                      },
                    };
                  },
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="ms-auto btn-block"
                onClick={handleUpload}
                disabled={fileUploadPending}
              >
                Upload
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col xs={6} sm={6} className="mb-4">
          <Button
            variant="primary"
            className="my-3 h-100 btn-block"
            onClick={handleShowModalTwo}
          >
            <FontAwesomeIcon icon={faGithub} className="me-2" />
            Git Repo
          </Button>

          <Modal
            as={Modal.Dialog}
            centered
            show={modalState === "modal-two"}
            onHide={handleClose}
          >
            <Modal.Header>
              <Modal.Title className="h6">Git Upload</Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose}
              />
            </Modal.Header>
            <Modal.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                onChange={handleChangeGit}
              >
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Git Repo</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="https://github.com/username/helloworld.git"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!validated}
                  className="btn-block"
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        {/* <Code code="$ yarn install" language="bash" /> */}
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Customers"
            title="Errors"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="Warnings"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget title="Recommendations" data={trafficShares} />
        </Col>
        <Col xs={12} sm={12} xl={8} className="mb-4">
          <SalesValueWidget title="Neo4J Graph" />
        </Col>
        <Col xs={12} sm={12} xl={4} className="mb-4">
          <PageVisitsTable />
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="mb-4">
          <PageTrafficTable />
        </Col>
        <Col xs={12} className="mb-4">
          <RankingTable />
        </Col>
        <Col xs={12} className="mb-4">
          <TransactionsTable />
        </Col>
        <Col xs={12} className="mb-4">
          <CommandsTable />
        </Col>
      </Row>
    </>
  );
};
