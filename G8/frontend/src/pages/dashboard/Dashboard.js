import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import React FilePond
import { FilePond } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import axios from "axios";
import {
  // faCashRegister,
  // faChartLine,
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

// import {
//   CounterWidget,
//   CircleChartWidget,
//   // BarChartWidget,
//   // TeamMembersWidget,
//   // ProgressTrackWidget,
//   // RankingWidget,
//   SalesValueWidget,
//   // SalesValueWidgetPhone,
//   // AcquisitionWidget,
// } from "../../components/Widgets";
import { ExistingProjectTable } from "../../components/Tables";
// import { trafficShares } from "../../data/charts";
// import Code from "../../components/Code";

const Dashboard = () => {
  const filePondRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    handleUploadRepo(event.target[0].value);
    setValidated(false);
  };
  const handleUploadRepo = (repoLink) => {
    var data = { repoLink: repoLink };
    axios
      .post(`http://localhost:8080/teamname/api/projects/repo`, data)
      .then((response) => {
        setValidated(true);
        alert("Success");
      })
      .catch((error) => {
        setValidated(true);
        alert(error);
      });
  };

  const handleChangeGit = (event) => {
    // const gitRegex = new RegExp(
    //   "^[a-zA-Z]+[://@]+(github|gitlab).com+(\/|:)?[a-zA-Z-!@#$%^&*()+]+(\/)?[a-zA-Z-!@#$%^&*()]+\.git$"
    // );
    const gitRegex = /^(http(s)?)(:(\/\/)?)([\w.@:/~-]+)(\.git)(\/)?$/;

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
    setFiles([]);
    setModalState("close");
  };

  // maybe just stick with normal 1 by 1 upload instead of all at once.
  // size of request is very large
  const handleUpload = () => {
    const pond = filePondRef.current;
    pond.processFiles();
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={6} sm={6} className="mb-4">
          <Button
            variant="primary"
            className="my-3 h-100 btn-block"
            onClick={handleShowModalOne}
          >
            <FontAwesomeIcon icon={faFolder} className="me-2" />
            Upload
          </Button>

          <Modal
            dialogClassName="my-modal"
            size="lg"
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
              <FilePond
                ref={filePondRef}
                files={files}
                allowProcess={false}
                allowRevert={false}
                instantUpload={false}
                allowMultiple={true}
                maxFiles={100}
                maxParallelUploads={100} // buggy?
                onwarning={(error, file, status) => {
                  if (error) {
                    if (file.length > 100) {
                      alert("Max file 100"); // Change to bootstrap alert later
                    } else {
                      alert("something went wrong!");
                    }
                  }
                }}
                onupdatefiles={(fileItems) => {
                  // Set currently active file objects to this.state
                  setFiles(fileItems.map((fileItem) => fileItem.file));
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
                    abort
                  ) => {
                    const pond = filePondRef.current;
                    // somehow files state is empty
                    const fileitems = pond.getFiles();

                    // related to aborting the request
                    const CancelToken = axios.CancelToken;
                    const source = CancelToken.source();

                    // Only upload once (always true when clicked submit)
                    // quite buggy
                    if (fileitems[0].file === file) {
                      // set data
                      const formData = new FormData();
                      fileitems.forEach((file) => {
                        formData.append(
                          "files",
                          file.file,
                          file.file._relativePath || file.file.name
                        );
                      });

                      axios({
                        method: "post",
                        url: "http://localhost:8080/teamname/api/projects/folder",
                        data: formData,
                        cancelToken: source.token,
                        onUploadProgress: (e) => {
                          // updating progress indicator
                          progress(e.lengthComputable, e.loaded, e.total);
                        },
                      })
                        .then((response) => {
                          // passing the file id to FilePond
                          load(response.data.message);
                        })
                        .catch((thrown) => {
                          if (axios.isCancel(thrown)) {
                            console.log("Request canceled", thrown.message);
                          } else {
                            setFiles([fileitems[0].file]);
                            error("oh no");
                          }
                        });
                    } else {
                      // just simulating upload complete
                      progress(true, 10000, 10000);
                      load("");
                    }

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
                disabled={files.length === 0}
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
                  <Form.Group as={Col} md="12">
                    <Form.Label>Git Repo</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="https://github.com/username/helloworld.git"
                      id="repoLink"
                      name="repoLink"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!validated}
                      className="btn-block mt-2"
                    >
                      Submit
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={12} xl={12} className="mb-4">
          <ExistingProjectTable />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
