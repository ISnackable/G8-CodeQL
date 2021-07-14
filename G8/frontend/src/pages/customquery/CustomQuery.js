import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import TextareaAutosize from "react-textarea-autosize";
import AceEditor from "react-ace";
// import mode-<language> , this imports the style and colors for the selected language.
import "ace-builds/src-noconflict/mode-mysql";
// import CustomMode from "./components/CustomMode.js";
import { setCompleters } from "ace-builds/src-noconflict/ext-language_tools";

// there are many themes to import, I liked monokai.
// import "ace-builds/src-noconflict/theme-monokai";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-nord_dark";
// import "ace-builds/src-noconflict/theme-solarized_dark";

// this is an optional import just improved the interaction.
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";

import useLocalStorageState from "use-local-storage-state";
// // Import React FilePond
// import { FilePond } from "react-filepond";
// // Import FilePond styles
// import "filepond/dist/filepond.min.css";
import axios from "axios";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Dropdown,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "@themesberg/react-bootstrap";
import DownloadCodeQLDatabaseButton from "../../components/DownloadCodeQLDatabaseButton";

// const customMode = new CustomMode();
// var EditSession = require("ace/edit_session").EditSession;
// var js = new EditSession("some js code");
// var css = new EditSession(["some", "css", "code here"]);
// // and then to load document into editor, just call
// editor.setSession(js);

// onclick handler will call the setcode function in line 77 and replace "code" variable with the "setCode" parameter contents
const backend_url =
  process.env.NODE_ENV === "production"
    ? "/g8/api"
    : `http://localhost:8080/g8/api`;

const CustomQuery = () => {
  // eslint-disable-next-line no-unused-vars
  const [logs, setLogs] = useLocalStorageState("log", []);
  const [responseData, setResponseData] = useState([]);
  const [currentProject, setCurrentProject] = useState({ id: null });
  const [currentProjectMessage, setCurrentProjectMessage] =
    useState(`No Project`);
  const [code, setCode] = useState(`import javascript
from BlockStmt b
where b.getNumStmt() = 0
select b, "This is an empty block."`);
  const [showSpinner, setShowSpinner] = useState(false);

  const fetchData = (e) => {
    if (e) e.preventDefault();
    axios
      .get(backend_url + `/projects`)
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const completer = {
      getCompletions: function (editor, session, pos, prefix, callback) {
        var completions = [
          {
            caption: "import",
            snippet: `import javascript`,
            meta: "Import CodeQL Library",
          },
          {
            caption: "from",
            snippet: `from <Type> <variable>`,
            meta: "Variable Declaration",
          },
          {
            caption: "where",
            snippet: `where <condition>`,
            meta: "Condition to meet",
          },
          {
            caption: "select",
            snippet: `select <variable>, "Description Text"`,
            meta: "Value to print out",
          },
        ];

        /* You Can get to know how to add more cool
        autocomplete features by seeing the ext-language-tools
        file in the ace-buils folder */

        completions.forEach((i) => {
          completions.push({
            caption: i.caption,
            snippet: i.snippet,
            type: i.type,
          });
        });
        callback(null, completions);
      },
    };

    /* You can even use addCompleters instead of setCompleters like this :
       `addCompleter(completer)`;
     */

    setCompleters([completer]);
    fetchData();
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DrawProjectlist = () => {
    return responseData.map((pv) => {
      let { id, project_name, sarif_filename } = pv;
      if (
        sarif_filename === "error" ||
        sarif_filename === "processing" ||
        sarif_filename == null
      ) {
        return <></>;
      }
      return (
        <Dropdown.Item
          className="fw-bold"
          onClick={() => {
            setCurrentProject(pv);
            setCurrentProjectMessage("Project #" + id);
          }}
        >
          <span>
            {project_name} <b>#{id}</b>
          </span>
        </Dropdown.Item>
      );
    });
  };

  const sendCustomQuery = () => {
    if (!currentProject.id) return alert("No project specified");
    console.log(code);
    console.log(currentProject.id);
    setShowSpinner(true);

    axios
      .post(backend_url + `/queryjobs/` + currentProject.id + `/`, {
        CustomQuery: code,
      }) //????
      .then((response) => {
        console.log(response.data);
        setLogs([response.data]);
        alert(
          "Finished analyzing. Please note that only the sarif file is available for viewing in the sarif viewer."
        );
        return;
      })
      .catch((error) => {
        alert("An error occured in the backend.");
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
        return;
      })
      .finally(() => {
        setShowSpinner(false);
      });
  };

  const SampleQueries = () => {
    return (
      <>
        <OverlayTrigger
          placement="right"
          trigger={["hover", "trigger"]}
          overlay={<Tooltip>Finds files called `index.js`</Tooltip>}
        >
          <Dropdown.Item
            className="fw-bold"
            onClick={() => {
              setCode(`import javascript

from File f
where f.getBaseName() = "index.js"
select f`);
            }}
          >
            <span className="me-5">File with given name</span>
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          trigger={["hover", "trigger"]}
          overlay={
            <Tooltip>
              Finds import statements that import from module 'react'
            </Tooltip>
          }
        >
          <Dropdown.Item
            className="fw-bold"
            onClick={() => {
              setCode(`import javascript

from ImportDeclaration id
where id.getImportedPath().getValue() = "react"
select id`);
            }}
          >
            <span className="me-5">Imports from 'react'</span>
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          trigger={["hover", "trigger"]}
          overlay={<Tooltip>Finds classes called 'File'</Tooltip>}
        >
          <Dropdown.Item
            className="fw-bold"
            onClick={() => {
              setCode(`import javascript

from ClassDefinition cd
where cd.getName() = "File"
select cd`);
            }}
          >
            <span className="me-5">Classes called 'File'</span>
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          trigger={["hover", "trigger"]}
          overlay={
            <Tooltip>
              Finds functions that are passed as arguments to other functions
            </Tooltip>
          }
        >
          <Dropdown.Item
            className="fw-bold"
            onClick={() => {
              setCode(`import javascript

from InvokeExpr invk, DataFlow::FunctionNode f
where f.flowsToExpr(invk.getAnArgument())
select invk, f`);
            }}
          >
            <span className="me-5">Callbacks</span>
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          trigger={["hover", "trigger"]}
          overlay={
            <Tooltip>Finds function calls of the form `eval(...)`</Tooltip>
          }
        >
          <Dropdown.Item
            className="fw-bold"
            onClick={() => {
              setCode(`import javascript

from CallExpr c
where c.getCalleeName() = "eval"
select c`);
            }}
          >
            <span className="me-5">Calls to function</span>
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          trigger={["hover", "trigger"]}
          overlay={
            <Tooltip>Finds calls of the form `this.isMounted(...)`</Tooltip>
          }
        >
          <Dropdown.Item
            className="fw-bold"
            onClick={() => {
              setCode(`import javascript

from MethodCallExpr c
where
  c.getReceiver() instanceof ThisExpr and
  c.getMethodName() = "isMounted"
select c`);
            }}
          >
            <span className="me-5">Method calls</span>
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          trigger={["hover", "trigger"]}
          overlay={
            <Tooltip>
              Finds places where we reference a variable called `undefined`
            </Tooltip>
          }
        >
          <Dropdown.Item
            className="fw-bold"
            onClick={() => {
              setCode(`import javascript

from VarRef ref
where ref.getVariable().getName() = "undefined"
select ref`);
            }}
          >
            <span className="me-5">Reference to variable</span>
          </Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          trigger={["hover", "trigger"]}
          overlay={
            <Tooltip>Finds property accesses of the form `x.innerHTML`</Tooltip>
          }
        >
          <Dropdown.Item
            className="fw-bold"
            onClick={() => {
              setCode(`import javascript

from PropAccess p
where p.getPropertyName() = "innerHTML"
select p`);
            }}
          >
            <span className="me-5">Property accesses</span>
          </Dropdown.Item>
        </OverlayTrigger>
      </>
    );
  };

  return (
    <Container className="px-0" fluid>
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <article>
                    <h1
                      className="h2"
                      id="quick-start"
                      style={{ marginLeft: "20px", marginTop: "10px" }}
                    >
                      Custom Query{" "}
                    </h1>
                    <p className="fs-5 fw-light" style={{ marginLeft: "20px" }}>
                      Create your own queries and run them against your own
                      projects !
                    </p>
                  </article>
                </Col>

                <Col md={{ span: 4, offset: 4 }}>
                  <Row style={{ marginTop: "10px", float: "right" , marginRight: "15px" }}>
                    <Col className="mb-2">
                      <DownloadCodeQLDatabaseButton
                        id={currentProject.id}
                      />
                    </Col>
                    <Col className="mb-2">
                      <Dropdown className="btn-toolbar">
                        <Dropdown.Toggle
                          as={Button}
                          variant="primary"
                          size="md"
                        >
                          {currentProjectMessage}
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className="me-2 mx-2"
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                          <DrawProjectlist />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="justify-content-md-center">
                <Col xs={12} sm={12} xl={12}>
                  <div className="w-100 p-3">
                    {/* something about on clicks here  */}

                    <label style={{ marginBottom: "10px" }}>
                      {" "}
                      Type in the box below{" "}
                    </label>

                    <AceEditor
                      style={{
                        height: "50vh",
                        width: "100%",
                        backgroundColor: "light grey",
                      }}
                      placeholder="Type your query here ! "
                      mode="mysql"
                      theme="nord_dark"
                      name="basic-code-editor"
                      onChange={(currentCode) => setCode(currentCode)}
                      fontSize={18}
                      showPrintMargin={true}
                      showGutter={true}
                      highlightActiveLine={true}
                      value={code}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                        useWorker: false,
                      }}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Dropdown className="btn-toolbar">
                    <Dropdown.Toggle
                      as={Button}
                      variant="primary"
                      size="lg"
                      className="me-2"
                      style={{ backgroundColor: "#262b40" , marginLeft: "15px" }}
                    >
                      Click for some sample queries
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="me-2 mx-2"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                      <SampleQueries />
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                <Col md={{ span: 4, offset: 4 }}>
                  <Button
                    variant="tertiary"
                    size="lg"
                    onClick={sendCustomQuery}
                    style={{ float: "right", marginRight: "15px" }}
                  >
                    {showSpinner && (
                      <Spinner
                        animation="border"
                        role="status"
                        size="sm"
                        as="span"
                      />
                    )}{" "}
                    Run Query
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomQuery;