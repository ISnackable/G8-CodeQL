import React from "react";
import useLocalStorageState from "use-local-storage-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Routes } from "../../routes";
import { Link } from "react-router-dom";

import { Col, Row, Button, Card, Table ,Image , } from "@themesberg/react-bootstrap";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Neo4jGraphWidget } from "../../components/Widgets";

// For show no errors image
import G8Logo from "../../assets/img/g8-logo-with-text.png"

const Overview = () => {
  // eslint-disable-next-line no-unused-vars
  const [logs, setLogs] = useLocalStorageState("log", []); // setlog function is a function to replace it
  // function to parse the information from the sarif file into readable human format
  function Printnoerrorsfound(){
    return (
      <>
      <Row>
      <Col xs={12} className="p-3">
      <Card>
        <Card.Body>
        <article>
            <h1 className="h2" id="quick-start">
              Overview
            </h1>
            <p className="fs-5 fw-light">
              This page contains the overview of the report generated with CodeQL
            </p>

            <p>only the files that also has a vulnerability are listed here.</p>
        </article>
          <Card>
            <Card.Body className="mx-auto ">
              <h4 className="fw-bold mt-5">Congrats, no results detected!</h4>
              <Image
                className="mx-auto mb-5"
                src={G8Logo}
                alt="No Results"
                height="400"
                width="350"
                rounded
              />
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
      </Col>
      </Row>

    </>
    )
  }
  function Addingalertstothetable() {
    if (logs.length === 0) return;
    if (
      logs[0].runs[0]?.results === undefined ||
      logs[0].runs[0]?.tool.driver.name !== "CodeQL"
    )
      return;

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
      var numberof = Object.values(grouped[ruleIndex])[0].length;
      var alertdetected = driverRules[ruleIndex].properties["name"];

      var serverityColour = "";

      switch (severity) {
        case "error":
          serverityColour += "text-danger";
          break;
        case "warning":
          serverityColour += "text-warning";
          break;
        default:
          serverityColour += "text-secondary";
          break;
      }

      // all the arrays in the web browser console
      // console.log(Object.values(grouped[ruleIndex]));
      tableJsx.push(
        <tr>
          <td className="border-0 fw-bold">{alertdetected}</td>
          <td className="border-0 fw-bold">
            <span className={serverityColour}>{severity}</span>
          </td>
          <td className="border-0 fw-bold">{numberof}</td>
        </tr>
      );
    }

    return tableJsx;
  }

  function Printthejsonparsething() {
    // setLogs([])

    // some config information

    // refer to CodeQLSarif.js and tplink1_snippets.sarif to see the extraction of information

    // console.log(logs);
    if (logs.length === 0) return;

    var results = logs[0].runs[0].results;
    var driverRules = logs[0].runs[0].tool.driver.rules;

    // console.log(results);
    // console.log(driverRules);
    var noOfError = 0;
    var noOfWarnings = 0;
    var noOfRecommendation = 0;

    // for loop runs through all the reults and display the severity level within the properties .

    for (let i = 0; i < results.length; i++) {
      var severity =
        driverRules[results[i].ruleIndex].properties["problem.severity"];

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
    if(noOfError===0&&noOfWarnings===0&&noOfRecommendation===0){
      return (<Printnoerrorsfound />)
    }
    // the html that returned when there is a poroject that is analysed
    return (
      <>
        <Row className="justify-content-between align-items-center mb-4">
          <Col xs={4}>
            <Card style={{ backgroundColor: "#FF6565" }}>
              <Card.Body>
                <Card.Text className="h1">{noOfError}</Card.Text>
                <Card.Text className="h4">Errors</Card.Text>

                <Card.Link href="/#/codeql-alerts">Check it out </Card.Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={4}>
            <Card style={{ backgroundColor: "yellow" }}>
              <Card.Body>
                <Card.Text className="h1">{noOfWarnings}</Card.Text>
                <Card.Text className="h4">Warnings</Card.Text>

                <Card.Link href="/#/codeql-alerts">Check it out </Card.Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={4}>
            <Card style={{ backgroundColor: "lightgreen" }}>
              <Card.Body>
                <Card.Text className="h1">{noOfRecommendation}</Card.Text>
                <Card.Text className="h4">Recommendations</Card.Text>
                <Card.Link href="/#/codeql-alerts">Check it out </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Neo4J graph */}
        <Row>
          <Col xl={12} className="mb-4">
            <Neo4jGraphWidget />
            {/* <Card>
              <Card.Title className="h1 ms-3 mt-3">Neo4J Graph</Card.Title>
              <Card.Body>
                <Card.Text>EMPTY</Card.Text>
                <Card.Text>EMPTY</Card.Text>
                <Card.Text>EMPTY</Card.Text>
                <Card.Text>EMPTY</Card.Text>
              </Card.Body>
            </Card> */}
          </Col>

          {/* display the alerts */}
          <Col xl={12} className="mb-2 ">
            <Card>
              <Table
                responsive
                bordered
                hover
                className="table-centered table-nowrap rounded mb-0"
              >
                <thead className="thead-light">
                  <tr>
                    <th className="border-0">Alerts Detected</th>
                    <th className="border-0">Severity</th>
                    <th className="border-0">#</th>
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
      <div className="mt-4">
        {logs.length !== 0 &&
          logs[0]?.runs[0]?.tool.driver.name === "CodeQL" && (
            <Printthejsonparsething />
          )}
      </div>

      <Row className="justify-content-md-center">
        {/* <Code code="$ yarn install" language="bash" /> */}
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <div className="d-flex align-items-center justify-content-center">
            {!logs.length &&
              logs[0]?.runs[0]?.tool.driver.name !== "CodeQL" && (
                <Printnoresultthing />
              )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
