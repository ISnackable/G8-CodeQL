import React, { useState, useEffect } from "react";
import { Routes } from "../routes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  Col,
  Row,
  Card,
  Container,
  // Alert,
  Button,
  Breadcrumb,
} from "@themesberg/react-bootstrap";
import {
  faInfoCircle,
  faExternalLinkAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import Snippet from "../components/Snippet";
import SnippetModal from "../components/SnippetModal";
import useLocalStorageState from "use-local-storage-state";
import * as htmlToImage from "html-to-image";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../components/CodeQLAlertPDF";
// import { generatePdfDocument } from "../components/GeneratePDFDocument";

const CodeQLAlerts = () => {
  // eslint-disable-next-line no-unused-vars
  const [logs, setLogs] = useLocalStorageState("log", []);
  const [items, setItems] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // const exportPDF = () => {
  //   // htmlToImage
  //   //   .toPng(document.getElementById("myPage"))
  //   //   .then(function (dataUrl) {
  //   //     const pdf = new jsPDF();
  //   //     const imgProps = pdf.getImageProperties(dataUrl);
  //   //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //   //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //   //     pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   //     pdf.save("download.pdf");
  //   //   });

  //   // Get List of paged elements.
  //   let elems = document.querySelectorAll(".elemClass");
  //   let pdf = new jsPDF("portrait", "mm", "a4");

  //   // Fix Graphics Output by scaling PDF and html2canvas output to 2
  //   pdf.scaleFactor = 2;

  //   // Create a new promise with the loop body
  //   let addPages = new Promise((resolve, reject) => {
  //     elems.forEach((elem, idx) => {
  //       // Scaling fix set scale to 2
  //       htmlToImage.toPng(elem).then(function (dataUrl) {
  //         const imgProps = pdf.getImageProperties(dataUrl);
  //         const pdfWidth = pdf.internal.pageSize.getWidth();
  //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //         console.log(elem);
  //         if (idx < elems.length - 1) {
  //           pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
  //           pdf.addPage();
  //         } else {
  //           pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
  //           console.log("Reached last page, completing");
  //           pdf.save();
  //         }
  //       });

  //       setTimeout(resolve, 100, "Timeout adding page #" + idx);
  //     });
  //   });
  // };

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
    setItems(tempSnippets.slice(0, 5));
    setSnippets(tempSnippets);
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

  const fetchMoreData = () => {
    if (items.length >= snippets.length) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      // setItems(items.concat(snippets.from({ length: 20 })));
      setItems(items.concat(snippets.slice(items.length, items.length + 5)));
    }, 500);
  };

  function NoLogResults() {
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

  const AlertCard = () => {
    return (
      <Card>
        <Card.Body>
          <article>
            <h1 className="h2" id="quick-start">
              Alerts{" "}
            </h1>
            <p className="fs-5 fw-light">
              These are the alerts generated with CodeQL
            </p>

            <p>only the files that also has a vulnerability are listed here.</p>
            <InfiniteScroll
              dataLength={90} //This is important field to render the next data
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p className="m-4" style={{ textAlign: "center" }}>
                  <b>You reached the end!</b>
                </p>
              }
            >
              {items.map((i) => i)}
            </InfiniteScroll>
          </article>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="px-0">
      <Row>
        <Col xs={12} className="p-3">
          {(!logs.length && logs[0]?.runs[0]?.results === undefined) ||
          logs[0]?.runs[0]?.tool.driver.name !== "CodeQL" ? (
            <NoLogResults />
          ) : (
            <>
              {/* <Button variant="outline-primary" size="sm" onClick={exportPDF}>
                Export
              </Button> */}
              <PDFDownloadLink
                document={<MyDocument />}
                fileName="somename.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Loading document..."
                  ) : (
                    <Button variant="outline-primary" size="sm">
                      Export
                    </Button>
                  )
                }
              </PDFDownloadLink>
              {/* <Button
                variant="outline-primary"
                size="sm"
                onClick={generatePdfDocument}
              >
                Download Now
              </Button>
              */}
              <AlertCard />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CodeQLAlerts;
