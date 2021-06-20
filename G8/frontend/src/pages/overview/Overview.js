import React, { useRef, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Routes } from "../../routes";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Col,
  Row,
  Button,
  Card,
  Dropdown,
  ButtonGroup,
  Modal,
  Table,
  Form,
} from "@themesberg/react-bootstrap";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const Overview = () => {
  const [logs, setLogs] = useLocalStorageState("log", []); // setlog function is a function to replace it
  // function to parse the information from the sarif file into readable human format

  function Addingalertstothetable() {
    if (logs.length === 0) return;

    var results = logs[0].runs[0].results;
    var driverRules = logs[0].runs[0].tool.driver.rules;

    // group the related alets together
    var grouped = {};
    for (let i = 0, len = results.length, r; i < len; i++) {
      r = results[i];
      // if (grouped[i] === undefined) grouped[i] = {};
      if (grouped[r.ruleIndex] === undefined) grouped[r.ruleIndex] = {};
      if (
        grouped[r.ruleIndex][
          driverRules[results[i].ruleIndex].properties["problem.severity"]
        ] === undefined
      )
        grouped[r.ruleIndex][
          driverRules[results[i].ruleIndex].properties["problem.severity"]
        ] = [];
      grouped[r.ruleIndex][
        driverRules[results[i].ruleIndex].properties["problem.severity"]
      ].push(driverRules[results[i].ruleIndex].properties["problem.severity"]);
    }

    // you can modifiy to return a
    var tableJsx = [];
    for (const ruleIndex in grouped) {
      var severity = Object.keys(grouped[ruleIndex])[0];
      var numberof = Object.values(grouped[ruleIndex]);
      var alertdetected = driverRules[ruleIndex].properties["name"];

      

      // all the arrays in the web browser console
      console.log(Object.values(grouped[ruleIndex]));
      tableJsx.push(
        <>
          <tr>
            <td>{alertdetected}</td>
            <td>{severity}</td>
            <td>{numberof}</td>
          </tr>
        </>
      );
    }

    return tableJsx;
  }

  function Printthejsonparsething() {
    // setLogs([])

    // some config information

    // refer to CodeQLSarif.js and tplink1_snippets.sarif to see the extraction of information

    console.log(logs);
    if (logs.length === 0) return;

    var results = logs[0].runs[0].results;
    var driverRules = logs[0].runs[0].tool.driver.rules;

    console.log(results);
    // console.log(driverRules);
    var noOfError = 0;
    var noOfWarnings = 0;
    var noOfRecommendation = 0;

    // for loop runs through all the reults and display the severity level within the properties .

    for (let i = 0; i < results.length; i++) {
      var severity =
        driverRules[results[i].ruleIndex].properties["problem.severity"];

      var alertdetected = driverRules[results[i].ruleIndex].properties["name"];

      // incrementing the number of errors , warnings and recommendation which will be inputted
      // into the boxes at the top of the webpage

      if (severity === "error") {
        noOfError++;
      } else if (severity === "warning") {
        noOfWarnings++;
      } else if (severity === "recommendation") {
        noOfRecommendation++;
      }
    }

    // function Addingalertstothetable() {
    //   for(var x=0; x < ; x++){
    //     console.log(x)
    //     return(
    //       <tr>
    //                 <td>{alertdetected}</td>
    //                 <td>{typedetected}</td>
    //                 <td>{x}</td>
    //       </tr>
    //     )
    //   }  var counter =

    // }

    // prints out the results from above
    console.log(noOfError);
    console.log(noOfWarnings);
    console.log(noOfRecommendation);
    console.log(alertdetected);
    console.log(severity);

    // the html that returned when there is a poroject that is analysed
    return (
      <>
        <Row className="justify-content-between align-items-center mb-5 mb-lg-7">
          <Col lg={4}>
            <Card style={{ width: "18rem", backgroundColor: "#FF6565" }}>
              <Card.Body>
                <Card.Text className="h1">{noOfError}</Card.Text>
                <Card.Text className="h4">Errors found</Card.Text>

                <Card.Link href="http://localhost:3000/#/codeql-alerts">
                  Check it out{" "}
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card style={{ width: "18rem", backgroundColor: "yellow" }}>
              <Card.Body>
                <Card.Text className="h1">{noOfWarnings}</Card.Text>
                <Card.Text className="h4">Warnings Found</Card.Text>

                <Card.Link href="http://localhost:3000/#/codeql-alerts">
                  Check it out{" "}
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card style={{ width: "18rem", backgroundColor: "lightgreen" }}>
              <Card.Body>
                <Card.Text className="h1">{noOfRecommendation}</Card.Text>
                <Card.Text className="h4">Recommendations</Card.Text>
                <Card.Link href="http://localhost:3000/#/codeql-alerts">
                  Check it out{" "}
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* 
        Neo4J graph */}
        <Row>
          <Col xs={12} sm={12} xl={8} className="mb-4">
            <Card>
              <Card.Title className="h1">Neo4J Graph</Card.Title>
              EMPTY
              <break></break>
              EMPTY
              <break></break>
              EMPTY
              <break></break>
              EMPTY
              <break></break>
              EMPTY
              <break></break>
            </Card>
          </Col>

          {/* display the alerts */}
          <Col xl={4} className="mb-2 ">
            <Card>
              <Table variant="dark" striped bordered hover>
                <thead>
                  <tr>
                    <th>Alerts Detected</th>
                    <th>Severity</th>
                    <th style={{ width: "10px" }}>#</th>
                  </tr>
                </thead>

                <tbody>
                  <Addingalertstothetable />
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  function Printnoresultthing() {
    return (
      <Card className="text-center">
        <Card.Body>
          <Card.Title>No Projects were found!</Card.Title>
          <Card.Text>
            Click the button below to upload a new project :)
          </Card.Text>
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
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <ButtonGroup>
          <Button variant="outline-primary" size="sm">
            Share
          </Button>
          <Button variant="outline-primary" size="sm">
            Export
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <Row className="justify-content-md-center">
          <Col>
            <div>{logs.length !== 0 && <Printthejsonparsething />}</div>
          </Col>
        </Row>
      </div>

      <Row className="justify-content-md-center">
        {/* <Code code="$ yarn install" language="bash" /> */}
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <div className="d-flex align-items-center justify-content-center">
            {logs.length === 0 && <Printnoresultthing />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
