import React, { useState, useEffect } from "react";
import G8Logo from "../assets/img/g8-logo.png";
import CodeQLLogo from "../assets/img/codeql-logo.png";
import Roboto from "../assets/fonts/Roboto-Regular.ttf";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Note,
} from "@react-pdf/renderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  Col,
  Row,
  Card,
  Button,
  Breadcrumb,
} from "@themesberg/react-bootstrap";
import {
  faInfoCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Snippet from "../components/Snippet";
import SnippetModal from "../components/SnippetModal";
import { createLocalStorageStateHook } from "use-local-storage-state";
// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// Create Document Component
const MyDocument = () => {
  const useLogs = createLocalStorageStateHook("log", []);
  const [logs, setLogs] = useLogs();

  const testingString = "TESTINGAWDAD";
  var today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  useEffect(() => {
    var tempSnippets = [];
    // const fetchData = () => {
    //   if (snippets.length > 120) {
    //     setHasMore(false);
    //     return;
    //   }

    //   // a fake async api call like which sends
    //   // 20 more records in .5 secs
    //   setTimeout(() => {}, 500);
    // };

    // Fix bad code, will die
    if (!logs) return; // Undef interpreted as loading.
    // filter out outdated sarif
    const runs = [].concat(
      ...logs.filter((log) => log.version === "2.1.0").map((log) => log.runs)
    );

    if (
      runs[0]?.results === undefined ||
      runs[0]?.tool.driver.name !== "CodeQL"
    )
      return;

    var grouped = {};
    for (let i = 0, len = runs[0].results.length, r; i < len; i++) {
      r = runs[0].results[i];
      // if (grouped[i] === undefined) grouped[i] = {};
      if (grouped[r.ruleId] === undefined) grouped[r.ruleId] = {};
      if (
        grouped[r.ruleId][
          r.locations[0].physicalLocation.artifactLocation.uri
        ] === undefined
      )
        grouped[r.ruleId][
          r.locations[0].physicalLocation.artifactLocation.uri
        ] = [];
      grouped[r.ruleId][
        r.locations[0].physicalLocation.artifactLocation.uri
      ].push(r);
    }

    var i = 0;
    for (const rule in grouped) {
      // console.log(`${rule}:`, grouped[rule]);
      let files = grouped[rule];
      // console.log(`${rule} has ${Object.keys(files).length} files`);
      for (const file in files) {
        i++;
        let alerts = files[file];
        let query =
          runs[0].tool.driver.rules[alerts[0].ruleIndex].properties.name;
        let description =
          runs[0].tool.driver.rules[alerts[0].ruleIndex].fullDescription.text;
        let severity =
          runs[0].tool.driver.rules[alerts[0].ruleIndex].properties[
            "problem.severity"
          ];
        let tags =
          runs[0].tool.driver.rules[alerts[0].ruleIndex].properties.tags;

        let badgeSeverity = "warning";
        switch (severity) {
          case "error":
            badgeSeverity = "danger";
            break;
          case "note":
            badgeSeverity = "info";
            break;
          default:
            badgeSeverity = "warning";
        }

        tempSnippets.push(
          <Card
            className="position-relative mb-4 shadow elemClass"
            key={"c" + alerts[0].ruleId + "-" + file + i}
          >
            <Card.Body key={"cb" + alerts[0].ruleId + "-" + file + i}>
              <Accordion>
                <Accordion.Item eventKey="panel-1">
                  <Accordion.Button
                    variant="link"
                    className="w-100 d-flex justify-content-between"
                  >
                    <Row>
                      <Col xs={12}>
                        <span className="h6 mb-0 fw-bold">
                          {i + ". " + query}
                        </span>
                      </Col>
                      <Col xs={12}>
                        <Breadcrumb
                          listProps={{
                            className:
                              "breadcrumb-primary breadcrumb-transparent",
                          }}
                        >
                          <small className="me-2">Source Root:</small>{" "}
                          {file.split("/").map((path, index) => (
                            <Breadcrumb.Item
                              className="text-dark"
                              key={index}
                              active
                            >
                              {path}
                            </Breadcrumb.Item>
                          ))}
                        </Breadcrumb>
                      </Col>
                    </Row>
                  </Accordion.Button>
                  <Accordion.Body>
                    <Card.Body className="py-2 px-0">
                      <Card.Text className="mb-0">{description}</Card.Text>
                    </Card.Body>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Button
                variant={"outline-" + badgeSeverity}
                className="m-2"
                size="sm"
              >
                {severity}
              </Button>
              {tags?.map((tag, index) => {
                return (
                  <Button
                    variant="light"
                    size="sm"
                    className="m-2"
                    key={"btn" + alerts[0].ruleId + "-" + file + "-" + index}
                  >
                    {tag}
                  </Button>
                );
              })}
              {alerts.map((alert, index) => {
                const ploc = alert.locations[0].physicalLocation;
                const codeFlow = alert.codeFlows;
                if (ploc.contextRegion?.snippet === undefined) {
                  return (
                    <div>
                      {renderMessageTextWithEmbeddedLinks(alert.message.text)}
                      {index < alerts.length - 1 && <hr key={"hr" + index} />}
                    </div>
                  );
                } else {
                  return (
                    <>
                      <Snippet
                        key={"s" + index}
                        ploc={ploc}
                        language="javascript"
                      ></Snippet>

                      {(!codeFlow?.length ? (
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="d-sm-inline ms-1"
                            />{" "}
                            {renderMessageTextWithEmbeddedLinks(
                              alert.message.text
                            )}
                          </span>
                        </div>
                      ) : (
                        <div className="violation-groups">
                          <span className="me-3">
                            <FontAwesomeIcon
                              icon={faExclamationCircle}
                              className="d-sm-inline ms-1"
                            />{" "}
                            {renderMessageTextWithEmbeddedLinks(
                              alert.message.text
                            )}
                          </span>

                          <SnippetModal
                            codeFlow={codeFlow}
                            modalTitle={query}
                          />
                        </div>
                      )) || ""}
                      {index < alerts.length - 1 && <hr key={"hr" + index} />}
                    </>
                  );
                }
              })}
            </Card.Body>
          </Card>
        );
      }
    }
  }, [logs]);

  function renderMessageTextWithEmbeddedLinks(text, result) {
    if (text) {
      const rxLink = /\[([^\]]*)\]\(([^)]+)\)/; // Matches [text](id). Similar to below, but with an extra grouping around the id part.
      return text.match(rxLink)
        ? text.split(/(\[[^\]]*\]\([^)]+\))/g).map((item, i) => {
            if (i % 2 === 0) return item;
            // eslint-disable-next-line no-unused-vars
            const [_, text, id] = item.match(rxLink); // Safe since it was split by the same RegExp.
            return (
              <code key={i} href={id}>
                {text}
              </code>
            );
          })
        : text;
    }
  }

  // Register font
  Font.register({
    family: "Roboto",
    src: Roboto,
  });

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "Roboto",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Roboto",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ G8 Code Scanner ~
        </Text>
        <Text style={styles.title}>Insert Project Name</Text>
        <Text style={styles.author}>Generated by: G8</Text>
        <Image
          style={styles.image}
          src="https://miro.medium.com/max/854/0*gDBWBQ_szNyCKQJw.png"
        />
        <Text style={styles.subtitle} break>
          1. The Code Review Process {testingString}
        </Text>
        <Text style={styles.text}>
          A Secure Code Review is a specialized task with the goal of
          identifying types of weaknesses that exist within a given code base.
          The task involves both manual and automated review of the underlying
          source code and identifies specific issues that may be representative
          of broader classes of weakness inherent in the code. A Secure Code
          Review does not attempt to identify every issue in the code, but
          instead attempts to identify types of risk within the code such that
          mitigation strategies can be devised.
        </Text>
        <Text style={styles.text}>
          During the actual review, members of a review team review the
          application code for security problems and categorize the findings
          based on the weakness categories (e.g., authentication, authorization,
          etc.). Each finding is assigned a risk rating of High, Medium, Low, or
          Informational. These findings and the broader weakness classes that
          they represent are presented in this final report that the development
          team can use as the foundation for improving the overall quality of
          the code base.
        </Text>
        <Text style={styles.text}>
          It should be noted that while the review process will be as thorough
          as possible in finding and reporting security weaknesses, it is not
          guaranteed to always find every possible weakness. If no issues are
          found, the review does not implicitly certify that the application is
          100-percent “hack proof.”
        </Text>
        <Text style={styles.text}>
          A Secure Code Review is not a silver bullet, but instead is a strong
          part of an overall risk mitigation program to protect an application.
        </Text>

        <Text style={styles.subtitle} break>
          2. Review Summary
        </Text>
        <Text style={styles.text}>
          AngularJS is secure by default through automated sanitization and
          filtering of untrusted values that could cause vulnerabilities such as
          XSS. Strict Contextual Escaping (SCE) is an execution mode in
          AngularJS that provides this security mechanism.
        </Text>
        <Text style={styles.text}>
          Disabling SCE in an AngularJS application is strongly discouraged. It
          is even more discouraged to disable SCE in a library, since it is an
          application-wide setting.
        </Text>
        <Text style={styles.text}>Do not disable SCE.</Text>
        <Text style={styles.text}>
          The following example shows an AngularJS application that disables SCE
          in order to dynamically construct an HTML fragment, which is later
          inserted into the DOM through $scope.html.
        </Text>
        <Text style={styles.text}>
          This is problematic, since it disables SCE for the entire AngularJS
          application.
        </Text>
        <Text style={styles.text}>
          Instead, just mark the dynamically constructed HTML fragment as safe
          using $sce.trustAsHtml, before assigning it to $scope.html:
        </Text>
        <Note style={styles.text}>
          Please note that this example is for illustrative purposes only; use
          the AngularJS templating system to dynamically construct HTML when
          possible.
        </Note>

        <Text style={styles.text}>
          The secure code review of the ### was completed on {today} by a review
          team consisting of ### and ###. The review was performed on code
          obtained from ### via email attachment on {today}, and bundled under
          the file named example_app_v2.tar.gz. A meeting between the review
          team, ### and ### was held on {today}, at which time information about
          the code structure was presented along with high level overviews of
          how things like authentication, data validation, and logging were
          implemented in the code. This information was used by the review team
          to formulate a plan for the impending review. The actual review
          involved a manual investigation of the Java code. Specific source
          files were not assigned to individual members; rather, each member of
          the review team attempted to review the entire application. Each
          reviewer recorded their specific findings within a spreadsheet and
          assigned risk levels as they felt appropriate. At the end of the
          review, the team looked across the individual spreadsheets to compare
          common findings and to perform group reviews of the uncommon findings.
          The specific findings are presented in the next section.
        </Text>
        <Text style={styles.subtitle} break>
          3. Finding Summary
        </Text>
        <Image style={styles.image} src={G8Logo} />
        <Text style={styles.text}>
          This section provides a summary of the findings resulting from this
          review. For this application, three high level issues were found
          related to the areas of authentication and data validation. One of the
          high level issues resulting from unvalidated attacker input being sent
          to the JSON parse function could result in arbitrary commands being
          executed. Mitigating actions should be considered. Some other medium
          and low issues have also been found. Details are given below. The
          figures below graphically outline the review team's findings by both
          category and risk level.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default MyDocument;
