import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
// import InfiniteScroll from "react-infinite-scroll-component";
import Snippet from "../components/Snippet";
import SnippetModal from "../components/SnippetModal";
import useLocalStorageState from "use-local-storage-state";

const CodeQLAlerts = () => {
  const [logs, setLogs] = useLocalStorageState("log", []);
  // const [hasMore, setHasMore] = useState(true);

  function renderMessageTextWithEmbeddedLinks(text, result) {
    if (text) {
      const rxLink = /\[([^\]]*)\]\(([^)]+)\)/; // Matches [text](id). Similar to below, but with an extra grouping around the id part.
      return text.match(rxLink)
        ? text.split(/(\[[^\]]*\]\([^)]+\))/g).map((item, i) => {
            if (i % 2 === 0) return item;
            const [_, text, id] = item.match(rxLink); // Safe since it was split by the same RegExp.
            return isNaN(+id) ? (
              <code key={i} tabIndex={-1}>
                {text}
              </code>
            ) : (
              <code key={i} tabIndex={-1}>
                {text}
              </code>
            );
          })
        : text;
    }
  }

  const SnippetsCards = () => {
    var snippets = [];
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
    if (!logs) return []; // Undef interpreted as loading.
    // filter out outdated sarif
    const runs = [].concat(
      ...logs.filter((log) => log.version === "2.1.0").map((log) => log.runs)
    );

    if (
      runs[0]?.results === undefined ||
      runs[0]?.tool.driver.name !== "CodeQL"
    )
      return [];

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

        snippets.push(
          <Card
            className="position-relative mb-4 shadow"
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
                      {(codeFlow?.length && (
                        <div className="violation-groups">
                          <span className="mx-3">
                            {renderMessageTextWithEmbeddedLinks(
                              alert.message.text
                            )}
                          </span>

                          <SnippetModal
                            codeFlow={codeFlow}
                            modalTitle={query}
                          />
                        </div>
                      )) ||
                        ""}
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

    return snippets;
  };

  return (
    <Container className="px-0">
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <article>
                <h1 className="h2" id="quick-start">
                  Alerts{" "}
                </h1>
                <p className="fs-5 fw-light">
                  These are the alerts generated with CodeQL
                </p>

                <p>
                  only the files that also has a vulnerability are listed here.
                </p>
                {/* <InfiniteScroll
                  dataLength={snippets.length} //This is important field to render the next data
                  next={fetchData}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p className="m-4" style={{ textAlign: "center" }}>
                      <b>You reached the end!</b>
                    </p>
                  }
                ></InfiniteScroll> */}
                <SnippetsCards />
              </article>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeQLAlerts;
