import React from "react";
import { Button, Dropdown, ButtonGroup } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Viewer } from "@microsoft/sarif-web-component";
import useLocalStorageState from "use-local-storage-state";
import DragAndDrop from "../components/DragAndDrop";

const SarifViewer = () => {
  const [logs, setLogs] = useLocalStorageState("log", []);

  const handleDisplayLogs = (files) => {
    const fileReader = new FileReader();
    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = (e) => {
      try {
        let log = JSON.parse(e.target.result);

        setLogs([...logs, log]);
      } catch (error) {
        console.error(error);
      }
    };
  };

  const removeLogs = () => {
    setLogs([]);
  };

  return (
    <>
      <DragAndDrop
        handleDrop={(files) => handleDisplayLogs(files)}
      ></DragAndDrop>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle
            as={Button}
            variant="primary"
            size="sm"
            className="me-2"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Edit
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <input id="input-file" className="d-none" type="file" />
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
              Upload Log
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold" onClick={removeLogs}>
              <FontAwesomeIcon icon={faTrash} className="me-2" />
              Remove Log
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
      <Viewer
        logs={logs}
        filterState={{
          Suppression: { value: ["unsuppressed"] },
          Baseline: { value: ["new"] },
          Level: { value: ["error", "warning"] },
        }}
        successMessage="No validated credentials detected."
      />
      <div style={{ height: "calc(100vh - 200px)" }}></div>
    </>
  );
};

export default SarifViewer;
