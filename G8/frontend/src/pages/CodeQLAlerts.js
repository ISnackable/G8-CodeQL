import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Card,
  Container,
  // Alert,
  Button,
} from "@themesberg/react-bootstrap";
import AccordionComponent from "../components/AccordionComponent";
// import InfiniteScroll from "react-infinite-scroll-component";
import Snippet from "../components/Snippet";
import SnippetModal from "../components/SnippetModal";
import useLocalStorageState from "use-local-storage-state";

const CodeQLAlerts = () => {
  const [logs, setLogs] = useLocalStorageState("log", []);
  // const [hasMore, setHasMore] = useState(true);

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

    if (runs[0]?.results === undefined) return [];

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
      // console.log(`${property}:`, grouped[property]);
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
              <AccordionComponent
                data={[
                  {
                    id: 1,
                    eventKey: "panel-1",
                    title: i + ". " + query + " in " + file,
                    description: description,
                  },
                ]}
                key={"ac" + alerts[0].ruleId + "-" + file}
              />
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
                          This alert flows to other parts of the code.{" "}
                        </span>

                        <SnippetModal codeFlow={codeFlow} modalTitle={query} />
                      </div>
                    )) ||
                      ""}
                    {index < alerts.length - 1 && <hr key={"hr" + index} />}
                  </>
                );
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
                  Please follow these steps to install the required
                  technologies:
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
