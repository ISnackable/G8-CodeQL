// import React, { useState } from "react"; // TODO: just for easy developement
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
  const [logs, setLogs] = useLocalStorageState("log", []); // TODO: just for easy developement
  // const [logs, setLogs] = useState([
  //   {
  //     version: "2.1.0",
  //     runs: [
  //       {
  //         tool: {
  //           driver: {
  //             name: "Sample Tool",
  //             rules: [
  //               {
  //                 id: "RULE01",
  //                 name: "Rule 1 Name",
  //                 helpUri: "https://github.com/Microsoft/sarif-sdk",
  //                 fullDescription: {
  //                   text: "Full description for RuleId 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //                 },
  //                 relationships: [
  //                   {
  //                     target: {
  //                       id: "??",
  //                       index: 0,
  //                       toolComponent: { index: 0 },
  //                     },
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         },
  //         taxonomies: [
  //           {
  //             taxa: [
  //               {
  //                 name: "Taxon00",
  //                 helpUri: "Taxon00/help/uri",
  //               },
  //             ],
  //           },
  //         ],
  //         versionControlProvenance: [
  //           {
  //             repositoryUri: "https://dev.azure.com/Office/Office/_git/Office",
  //             revisionId: "da79c32c5a0dd2d08b1f411a6a2a1f752e215e73",
  //             branch: "master",
  //           },
  //         ],
  //         results: [
  //           // versionControlProvenance
  //           {
  //             ruleId: "RULE01",
  //             message: { text: "a) Version Control Provenance." },
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: {
  //                     uri: "/folder/file1.txt",
  //                     uriBaseId: "SCAN_ROOT",
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //           // { // Bare minimum
  //           //     message: {},
  //           // },
  //           {
  //             ruleId: "RULE01",
  //             message: {
  //               text: 'Message only. Keyword "location" for testing.',
  //             },
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: { uri: "folder/file3.txt" },
  //                 },
  //               },
  //             ],
  //             baselineState: "absent",
  //             workItemUris: ["http://sarifviewer.azurewebsites.net/"],
  //           },
  //           {
  //             ruleId: "RULE01/1",
  //             message: { text: "Message with basic snippet." },
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: {
  //                     uri: "folder/file1.txt",
  //                     properties: { href: "http://example.com" },
  //                   },
  //                   region: {
  //                     snippet: {
  //                       text: "Region snippet text only abc\n".repeat(10),
  //                     },
  //                   },
  //                 },
  //               },
  //             ],
  //             baselineState: "new",
  //             level: "error",
  //           },
  //           {
  //             ruleId: "RULE01",
  //             message: {},
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: { uri: "folder/file2.txt" },
  //                   region: {
  //                     snippet: {
  //                       text: "Region snippet text only. No message. def",
  //                     },
  //                   },
  //                 },
  //               },
  //             ],
  //             baselineState: "unchanged",
  //             level: "note",
  //           },
  //           {
  //             ruleId: "RULE01",
  //             message: { text: "Testing show all." },
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: { uri: "folder/file4.txt" },
  //                 },
  //               },
  //             ],
  //             baselineState: "new",
  //           },
  //           {
  //             ruleId: "RULE01",
  //             message: {
  //               text: "Empty circle for level: none, kind: (undefined).",
  //             },
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: { uri: "folder/file5.txt" },
  //                 },
  //               },
  //             ],
  //             baselineState: "new",
  //             level: "none",
  //           },
  //           {
  //             ruleId: "RULE01",
  //             message: { text: "Green check for level: none, kind: pass." },
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: { uri: "folder/file5.txt" },
  //                 },
  //               },
  //             ],
  //             baselineState: "new",
  //             level: "none",
  //             kind: "pass",
  //           },

  //           // Variations in Snippets.
  //           {
  //             ruleId: "RULE03",
  //             message: {
  //               text: "1. Message with basic snippet and startLine",
  //             },
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: { uri: "folder/file.txt" },
  //                   region: {
  //                     snippet: { text: "Region snippet text only." },
  //                     startLine: 100,
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //           {
  //             ruleId: "RULE03",
  //             message: {
  //               text: "2. Message with basic snippet and contextRegion",
  //             },
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: { uri: "folder/file.txt" },
  //                   region: {
  //                     snippet: { text: "Region snippet text only." },
  //                     startLine: 100,
  //                   },
  //                   contextRegion: {
  //                     snippet: {
  //                       text: "aaa\nRegion snippet text only.\nbbb",
  //                     },
  //                   },
  //                 },
  //               },
  //             ],
  //           },

  //           // Variations in AXE.
  //           {
  //             ruleId: "RULE04",
  //             message: { text: "1. AXE-ish location. Typical." },
  //             locations: [
  //               {
  //                 logicalLocation: {
  //                   fullyQualifiedName: "fullyQualifiedName",
  //                 },
  //                 physicalLocation: {
  //                   artifactLocation: { index: 0 }, // Link to...
  //                   region: {
  //                     snippet: { text: "Region snippet text only" },
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //           {
  //             ruleId: "RULE04",
  //             message: { text: "2. AXE-ish location. No artifact location." },
  //             locations: [
  //               {
  //                 logicalLocation: {
  //                   fullyQualifiedName: "fullyQualifiedName",
  //                 },
  //                 physicalLocation: {
  //                   region: {
  //                     snippet: { text: "Region snippet text only" },
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //           {
  //             ruleId: "RULE04",
  //             message: { text: "1. AXE-ish location. Typical." },
  //             locations: [
  //               {
  //                 physicalLocation: {
  //                   artifactLocation: {
  //                     uri: "fallback-missing-fullyQualifiedName",
  //                   },
  //                   region: {
  //                     snippet: { text: "Region snippet text only" },
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //         ],
  //         artifacts: [
  //           {
  //             location: { uri: "indexed/artifact/uri" },
  //             description: {
  //               text: "Some really long text for indexed/artifact/uri",
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

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
