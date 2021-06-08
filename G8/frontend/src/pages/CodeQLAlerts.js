import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Card,
  // Form,
  Container,
  // Alert,
  // Button,
  // ButtonGroup,
  // Breadcrumb,
  // InputGroup,
  // Dropdown,
} from "@themesberg/react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Snippet from "../components/Snippet";
// import { TransactionsTable } from "../components/Tables";
import useLocalStorageState from "use-local-storage-state";

export default () => {
  const [logs, setLogs] = useLocalStorageState("log", []);
  const [hasMore, setHasMore] = useState(true);

  var snippet = [];
  const fetchData = () => {
    if (snippet.length >= 120) {
      setHasMore(false);
    }
  };

  // Fix bad code, will die
  if (!logs) return []; // Undef interpreted as loading.
  // filter out outdated sarif
  const runs = [].concat(
    ...logs.filter((log) => log.version === "2.1.0").map((log) => log.runs)
  );

  const isResult = (item) => item?.message !== undefined;
  if (isResult(runs[0]?.results[0])) {
    snippet = runs[0].results.map((result, index) => {
      const qname = runs[0].tool.driver.rules[result.ruleIndex].properties.name;
      const ploc = result.locations[0].physicalLocation;
      return (
        <section key={index}>
          <h2 key={"q" + index} className="fs-5 mt-4" id="using-yarn">
            {index + 1}. {qname}
          </h2>
          <Snippet
            key={"s" + index}
            ploc={ploc}
            language="javascript"
          ></Snippet>
        </section>
      );
    });
  }

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
                {/* Implement some sort of lazy loading 
                    render large lists in React
                */}
                <InfiniteScroll
                  dataLength={snippet.length} //This is important field to render the next data
                  next={fetchData}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p className="m-4" style={{ textAlign: "center" }}>
                      <b>You reached the end!</b>
                    </p>
                  }
                >
                  {snippet}
                </InfiniteScroll>
              </article>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// export default () => {
//   return (
//     <>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <div className="d-block mb-4 mb-md-0">
//           <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
//             <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
//             <Breadcrumb.Item>Volt</Breadcrumb.Item>
//             <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
//           </Breadcrumb>
//           <h4>Transactions</h4>
//           <p className="mb-0">Your web analytics dashboard template.</p>
//         </div>
//         <div className="btn-toolbar mb-2 mb-md-0">
//           <ButtonGroup>
//             <Button variant="outline-primary" size="sm">Share</Button>
//             <Button variant="outline-primary" size="sm">Export</Button>
//           </ButtonGroup>
//         </div>
//       </div>

//       <div className="table-settings mb-4">
//         <Row className="justify-content-between align-items-center">
//           <Col xs={8} md={6} lg={3} xl={4}>
//             <InputGroup>
//               <InputGroup.Text>
//                 <FontAwesomeIcon icon={faSearch} />
//               </InputGroup.Text>
//               <Form.Control type="text" placeholder="Search" />
//             </InputGroup>
//           </Col>
//           <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
//             <Dropdown as={ButtonGroup}>
//               <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
//                 <span className="icon icon-sm icon-gray">
//                   <FontAwesomeIcon icon={faCog} />
//                 </span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
//                 <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
//                 <Dropdown.Item className="d-flex fw-bold">
//                   10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
//                 </Dropdown.Item>
//                 <Dropdown.Item className="fw-bold">20</Dropdown.Item>
//                 <Dropdown.Item className="fw-bold">30</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col>
//         </Row>
//       </div>

//       <TransactionsTable />
//     </>
//   );
// };
