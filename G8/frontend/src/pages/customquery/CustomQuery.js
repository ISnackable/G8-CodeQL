import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import TextareaAutosize from "react-textarea-autosize";
import AceEditor from "react-ace";
// import mode-<language> , this imports the style and colors for the selected language.
import "ace-builds/src-noconflict/mode-javascript";
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
} from "@themesberg/react-bootstrap";

// var EditSession = require("ace/edit_session").EditSession;
// var js = new EditSession("some js code");
// var css = new EditSession(["some", "css", "code here"]);
// // and then to load document into editor, just call
// editor.setSession(js);

// onclick handler will call the setcode function in line 77 and replace "code" variable with the "setCode" parameter contents
const backend_url = `http://localhost:8080/teamname/api`;
const CustomQuery = () => {
  // eslint-disable-next-line no-unused-vars
  const [logs, setLogs] = useLocalStorageState("log", []);
  let [responseData, setResponseData] = React.useState([]);
  let [currentProject, setCurrentProject] = React.useState({ id: null });
  let [currentProjectMessage, setCurrentProjectMessage] =
    React.useState(`No Project`);
  const [code, setCode] = useState(`import javascript
from BlockStmt b
where b.getNumStmt() = 0
select b, "This is an empty block."`);
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
    fetchData();
    return () => {};
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
        <>
          <Dropdown.Item
            className="fw-bold"
            onClick={() => {
              setCurrentProject(pv);
              setCurrentProjectMessage("Project #" + id);
            }}
          >
            <span>{project_name}</span>
            <span> #{id}</span>
          </Dropdown.Item>
        </>
      );
    });
  };

  const sendCustomQuery = () => {
    if (!currentProject.id) return alert("No project specified");
    console.log(code);
    console.log(currentProject.id);

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
        return;
      });
  };

  const SampleQueries = () => {
    return (
      <>
        <Dropdown.Item
          className="fw-bold"
          onClick={() => {
            setCode(`import javascript
import DataFlow::PathGraph
import semmle.javascript.security.dataflow.LogInjection::LogInjection

from LogInjectionConfiguration config, DataFlow::PathNode source, DataFlow::PathNode sink
where config.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "$@ flows to log entry.", source.getNode(),"User-provided value"`);
          }}
        >
          <span>Log Injection</span>
        </Dropdown.Item>

        <Dropdown.Item
          className="fw-bold"
          onClick={() => {
            setCode(`import javascript
import semmle.javascript.security.dataflow.StoredXss::StoredXss  
import DataFlow::PathGraph
    
from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "Stored cross-site scripting vulnerability due to $@.", source.getNode(), "stored value"`);
          }}
        >
          <span>Stored XSS </span>
        </Dropdown.Item>

        <Dropdown.Item
          className="fw-bold"
          onClick={() => {
            setCode(`import javascript
import semmle.javascript.security.dataflow.CodeInjection::CodeInjection
import DataFlow::PathGraph
    
from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink,
"$@ flows to " + sink.getNode().(Sink).getMessageSuffix() + ".", source.getNode(), "User-provided value"`);
          }}
        >
          <span> Code Injection </span>
        </Dropdown.Item>

        <Dropdown.Item
          className="fw-bold"
          onClick={() => {
            setCode(`import javascript
import semmle.javascript.security.dataflow.RegExpInjection::RegExpInjection
import DataFlow::PathGraph
    
from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "This regular expression is constructed from a $@.", source.getNode(), "user-provided value"`);
          }}
        >
          <span> Regular expression Injection </span>
        </Dropdown.Item>

        <Dropdown.Item
          className="fw-bold"
          onClick={() => {
            setCode(`import javascript
import semmle.javascript.security.dataflow.CleartextStorage::CleartextStorage
import DataFlow::PathGraph

from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "Sensitive data returned by $@ is stored here.", source.getNode(), source.getNode().(Source).describe()`);
          }}
        >
          <span> Clear Text Storage </span>
        </Dropdown.Item>

        <Dropdown.Item
          className="fw-bold"
          onClick={() => {
            setCode(`import javascript

from InvokeExpr invk, DataFlow::FunctionNode f
where f.flowsToExpr(invk.getAnArgument())
select invk, f`);
          }}
        >
          <span> Callback Query </span>
        </Dropdown.Item>
      </>
    );
  };

  return (
    <Container className="px-0" fluid>
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <div
                style={{
                  float: "right",
                  marginRight: "50px",
                  marginTop: "30px",
                }}
              >
                <Dropdown className="btn-toolbar">
                  <Dropdown.Toggle
                    as={Button}
                    variant="primary"
                    size="lg"
                    className="me-2"
                    style={{ backgroundColor: "red" }}
                  >
                    {currentProjectMessage}
                    <FontAwesomeIcon icon={faCaretDown} className="me-2 mx-2" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                    <DrawProjectlist />
                    <Dropdown.Divider>
                      {/* Sample project goes here */}
                    </Dropdown.Divider>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <article>
                <h1
                  className="h2"
                  id="quick-start"
                  style={{ marginLeft: "20px ", marginTop: "10px" }}
                >
                  Custom Query{" "}
                </h1>
                <p className="fs-5 fw-light" style={{ marginLeft: "20px" }}>
                  Create your own queries and run them against your own projects
                  !
                </p>
              </article>

              <Row className="justify-content-md-center">
                <Col xs={12} sm={12} xl={12} className="mb-8">
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
                      mode="javascript"
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
                      }}
                    />
                  </div>

                  <div
                    style={{
                      float: "left",
                      marginRight: "50px",
                      marginLeft: "20px",
                    }}
                  >
                    <Dropdown className="btn-toolbar">
                      <Dropdown.Toggle
                        as={Button}
                        variant="primary"
                        size="lg"
                        className="me-2"
                        style={{ backgroundColor: "#262b40" }}
                      >
                        Click for some sample queries
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          className="me-2 mx-2"
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                        <SampleQueries />
                        <Dropdown.Divider>
                          {/* Sample project goes here */}
                        </Dropdown.Divider>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div style={{ float: "right", marginRight: "50px" }}>
                    <Button
                      variant="Success"
                      size="lg"
                      style={{ backgroundColor: "green", color: "black" }}
                      onClick={sendCustomQuery}
                    >
                      Run Query
                    </Button>
                  </div>
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
