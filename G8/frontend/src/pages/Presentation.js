import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveProvider, LiveEditor } from "react-live";
import { CopyToClipboard } from "react-copy-to-clipboard";
import themeStyle from "../assets/syntax-themes/ghcolors.json";
import { faBook, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Container,
  // ListGroup,
  Tooltip,
  OverlayTrigger,
  // Form,
  Navbar,
  Nav,
  Badge,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// import Code from "../components/Code";
import Snippet from "../components/Snippet";
// import GitHubButton from "react-github-btn";

import { Routes } from "../routes";
import MainImage from "../assets/img/allphoto.png";
import Neo4JImage from "../assets/img/neo4jimage.png";
import ReactMockupImg from "../assets/img/reactimage.png";
import ExpressMockupImg from "../assets/img/expressimage.png";
import ReactLogo from "../assets/img/technologies/react-logo.svg";
import G8Logo from "../assets/img/g8-logo.png";
import Neo4JLogo from "../assets/img/neo4j-logo.png";
import CodeQLLogo from "../assets/img/codeql-logo.png";
import ExpressJSLogo from "../assets/img/expressjs-logo.png";
// import CodeQLQuery from "../assets/img/codeql-query.jpg";
import GithubLogo from "../assets/img/github-logo.png";
// import CodeQLQuery2 from "../assets/img/codeql-query-2.jpg";

const Presentation = () => {
  // eslint-disable-next-line no-unused-vars
  const [code, setCode] = useState(`import javascript
import semmle.javascript.security.dataflow.DomBasedXss::DomBasedXss
import DataFlow::PathGraph

from DataFlow::Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where
  (
    cfg instanceof HtmlInjectionConfiguration or
    cfg instanceof JQueryHtmlOrSelectorInjectionConfiguration
  ) and
  cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink,
  sink.getNode().(Sink).getVulnerabilityKind() + " vulnerability due to $@.", source.getNode(),
  "user-provided value"`);
  const [copied, setCopied] = useState(false);
  const tempPloc = {
    artifactLocation: {
      uri: "login.htm",
      uriBaseId: "%SRCROOT%",
      index: 66,
    },
    region: {
      startLine: 1390,
      startColumn: 53,
      endColumn: 70,
    },
    contextRegion: {
      startLine: 1388,
      endLine: 1392,
      snippet: {
        text: "                count--;\r\n                buttonError($('#pc-cloud-btn'), timesText.replace('$', count), true);\r\n                inputError($('#ph-cloud-password'), timesText.replace('$', count), true);\r\n                window.setTimeout(arguments.callee, 1000);\r\n            }, 1000);\r\n",
      },
    },
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        bg="dark"
        className="navbar-transparent navbar-theme-primary sticky-top"
      >
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand
            as={HashLink}
            to="#home"
            className="me-lg-3 d-flex align-items-center"
          >
            <Image src={G8Logo} className="image image-sm" alt="G8 Logo" />
            <span className="ms-2 brand-text d-none d-md-inline">
              G8 Code Scanner
            </span>
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <Navbar.Collapse id="navbar-default-primary">
              <Nav className="navbar-nav-hover align-items-lg-center">
                <Nav.Link as={HashLink} to="#features">
                  Features
                </Nav.Link>
                <Nav.Link as={HashLink} to="#codeql">
                  CodeQL
                </Nav.Link>
                <Nav.Link as={HashLink} to="#neo4j">
                  Neo4J
                </Nav.Link>
                <Nav.Link as={Link} to={Routes.DocsQuickStart.path}>
                  Getting Started
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>

      <section
        className="section-header overflow-hidden pt-5 pt-lg-6 pb-9 pb-lg-12 bg-primary text-white"
        id="home"
      >
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <div className="react-big-icon d-none d-lg-block">
                <span>
                  <Image src={G8Logo} className="image" alt="G8 Logo" />
                </span>
              </div>
              <h1 className="fw-bolder text-secondary">G8 Code Scanner</h1>
              <p className="text-muted fw-light mb-5 h5">
                Powered by CodeQL technology and React.js
              </p>

              {/* explore dashboard button */}
              <div className="d-flex align-items-center justify-content-center">
                <Button
                  variant="secondary"
                  as={Link}
                  to={Routes.Dashboard.path}
                  className="text-dark me-3"
                >
                  Explore dashboard{" "}
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="d-none d-sm-inline ms-1"
                  />
                </Button>
              </div>

              {/* end of explore dashboard */}

              <div className="d-flex justify-content-center flex-column mb-6 mb-lg-5 mt-5">
                <div className="text-center"></div>
              </div>
            </Col>
          </Row>
          <figure className="position-absolute bottom-0 left-0 w-100 d-none d-md-block mb-n2">
            <svg
              className="fill-soft"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 3000 185.4"
            >
              <path d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z" />
            </svg>
          </figure>
        </Container>
      </section>
      {/* 
 the one with the 4 circles */}

      <div className="section pt-0">
        <Container className="mt-n10 mt-lg-n12 z-2">
          <Row className="justify-content-center">
            <Col xs={12}>
              <Image src={MainImage} alt="Mockup presentation" />
            </Col>
          </Row>
          <Row className="justify-content-center mt-5 mt-lg-6">
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faReact} className="text-secondary" />
              </div>
              <h3 className="fw-bolder">React JS</h3>
              <p className="text-gray">Website Frontend</p>
            </Col>
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <Image width="50" src={CodeQLLogo} alt="CodeQL Logo" />
              </div>
              <h3 className="fw-bolder">CodeQL</h3>
              <p className="text-gray">Query-based analysis</p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <Image width="50" src={Neo4JLogo} alt="Neo4J Logo" />
              </div>
              <h3 className="fw-bolder">Neo4J</h3>
              <p className="text-gray">Node graph visualization</p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <Image width="50" src={ExpressJSLogo} alt="ExpressJS Logo" />
              </div>
              <h3 className="fw-bolder">Express JS</h3>
              <p className="text-gray">Backend</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* start of powered by react.js that line */}
      <section className="section section-md bg-soft pt-lg-3" id="features">
        <Container>
          <Row className="justify-content-between align-items-center mb-5 mb-lg-7">
            <Col lg={5} className="order-lg-2 mb-5 mb-lg-0">
              <h2 className="d-flex align-items-center">
                Powered by React.js
                <Badge
                  pill
                  bg="secondary"
                  text="dark"
                  className="badge-md ms-3 mb-0 fs-6"
                >
                  Top 1
                </Badge>
              </h2>
              <p className="mb-3 lead fw-bold">
                The most popular front-end library in the world
              </p>
              <p className="mb-4">
                G8 Code Scanner is an code scanner which was built using
                React.js on the front end. With such amazing features , your
                experience on this website will be impeccable.
              </p>
              <Button
                variant="secondary"
                as={Link}
                to={Routes.Dashboard.path}
                className="text-dark me-3"
              >
                <FontAwesomeIcon icon={faReact} className="me-1" /> Live Demo
              </Button>
              <Button
                href="/#/documentation/quick-start"
                variant="outline-primary"
                target="_blank"
              >
                <FontAwesomeIcon icon={faBook} className="me-2" /> Guide
              </Button>
            </Col>
            <Col lg={6} className="order-lg-1">
              <Image src={ReactMockupImg} alt="Calendar Preview" />
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center mb-5 mb-lg-7">
            <Col lg={5} className="mb-5 mb-lg-0">
              <h2>Powered by Express.js</h2>
              <p className="mb-3 lead fw-bold">
                The most popular back end web application framework for Node.js
              </p>
              <p className="mb-4">
                G8 Code Scanner is an code scanner which was built using
                Express.js on the back end. With such amazing features , your
                experience on this website will be impeccable.
              </p>
              <Button
                href="/#/documentation/quick-start"
                variant="outline-primary"
                target="_blank"
              >
                <FontAwesomeIcon icon={faBook} className="me-2" /> Guide
              </Button>
            </Col>
            <Col lg={6} className="order-lg-1">
              <Image src={ExpressMockupImg} alt="Calendar Preview" />
            </Col>
          </Row>
          {/* codeql feature  */}
          <Row
            className="justify-content-between align-items-center mb-5 mb-lg-7"
            id="codeql"
          >
            <Col lg={5}>
              <h2>CodeQL Technology</h2>
              <p className="mb-3 lead fw-bold">
                One of the best static analysis tool engines
              </p>
              <p className="mb-4">
                We've implemented CodeQL queries which are written to scan for
                Javascript vulnerabilities.
              </p>
              <p className="mb-4">
                Examples : Cross Site Scripting ( XSS ) , SQL Injection , Broken
                Access Control etc.
              </p>
              <Button
                as={Link}
                to={Routes.Dashboard.path}
                variant="secondary"
                className="mb-5 mb-lg-0"
                target="_blank"
              >
                Explore dashboard{" "}
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className="d-none d-sm-inline ms-1"
                />
              </Button>
            </Col>
            <Col lg={6} className="rounded shadow pt-3">
              <LiveProvider
                // noInline={noInline}
                code={code}
                language={"jsx"}
                theme={themeStyle}
              >
                <Row>
                  <Col xs={12} className="mb-4">
                    <Card>
                      <Card.Body className="position-relative">
                        <LiveEditor
                          onChange={handleCodeChange}
                          className="live-editor"
                        />

                        {copied ? (
                          <span className="text-success copy-code-text">
                            Copied
                          </span>
                        ) : null}

                        <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="top"
                          overlay={<Tooltip>Copy to clipboard</Tooltip>}
                        >
                          <CopyToClipboard text={code} onCopy={handleCopy}>
                            <Button
                              size="sm"
                              variant="primary"
                              className="copy-code-button"
                            >
                              Copy
                            </Button>
                          </CopyToClipboard>
                        </OverlayTrigger>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </LiveProvider>
              {/* <Image src={CodeQLQuery} /> */}
            </Col>
          </Row>
          {/* where the pro features are stored */}
          <Row
            className="justify-content-between align-items-center mb-5 mb-lg-7"
            id="neo4j"
          >
            <Col lg={5} className="order-lg-2 mb-5 mb-lg-0">
              <h2 className="d-flex align-items-center">
                Neo4J{" "}
                <Badge
                  pill
                  bg="secondary"
                  text="dark"
                  className="badge-md ms-3 mb-0 fs-6"
                >
                  Added Feature
                </Badge>
              </h2>
              <p className="mb-3 lead fw-bold">
                Node Graph for better visualization
              </p>
              <p className="mb-4">
                With our newly implemented Neo4J graph feature , users can
                expect to understand their codes and alerts in a more visually
                appealing and understandable way
              </p>
              {/* glink to user guide in code */}
              <Button
                as={Link}
                to={Routes.Dashboard.path}
                variant="secondary"
                className="text-dark me-3"
                target="_blank"
              >
                Explore dashboard{" "}
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className="d-none d-sm-inline ms-1"
                />
              </Button>
              <Button
                href="/#/documentation/quick-start"
                variant="outline-primary"
                target="_blank"
              >
                <FontAwesomeIcon icon={faBook} className="me-2" /> Guide
              </Button>
            </Col>

            {/* replace with neo4j screenshot*/}

            <Col lg={6} className="order-lg-1">
              <Image
                src={Neo4JImage}
                alt="MapBox Leaflet.js Custom Integration Mockup"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Dark blue less work more flow section */}

      <section className="section section-lg bg-primary">
        <Container>
          <Row className="justify-content-center text-center text-white mb-5">
            <Col xs={12}>
              <h2 className="fw-light mb-3">
                Less <span className="fw-bold">work</span>, more{" "}
                <span className="fw-bold">speed</span>.
              </h2>
              <p className="lead px-lg-8">
                Boost accuracy and efficiency with CodeQL. Alerts are present to
                show you vulnerabilities Saves time for everyone
              </p>
            </Col>
          </Row>

          {/* white container with the "code" */}

          <Row className="justify-content-center">
            <Col md={10} xl={10}>
              <div className="position-relative">
                {/* <Image width="200%" src={CodeQLQuery2} /> */}
                <Card className="position-relative mb-4">
                  <Card.Body>
                    <Snippet ploc={tempPloc} language="javascript" />
                  </Card.Body>
                </Card>
              </div>
              <p className="mt-4 text-white text-center mb-0">
                Looks unfamiliar? Don’t worry! Our{" "}
                <Link
                  to={Routes.DocsQuickStart.path}
                  className="text-white text-underline fw-bold"
                  target="_blank"
                >
                  documentation
                </Link>{" "}
                has got you covered.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-lg bg-white">
        <Container>
          <Row className="mt-lg-3">
            <Col xs={12} className="text-center">
              <h2 className="h5 text-gray fw-normal mb-4">
                Made with the following technologies:
              </h2>
              <div>
                <Card.Link
                  href="https://securitylab.github.com/tools/codeql/"
                  target="_blank"
                  className="me-3"
                  rel="noreferrer"
                >
                  <OverlayTrigger
                    placement="top"
                    trigger={["hover", "focus"]}
                    overlay={
                      <Tooltip>
                        CodeQL · Discover vulnerabilities across a codebase with
                        CodeQL, our industry-leading semantic code analysis
                        engine. CodeQL lets you query code as though it were
                        data. Write a query to find all variants of a
                        vulnerability, eradicating it forever. Then share your
                        query to help others do the same. in the world.
                      </Tooltip>
                    }
                  >
                    <Image
                      src={CodeQLLogo}
                      className="image image-sm"
                      alt="CodeQL Logo"
                    />
                  </OverlayTrigger>
                </Card.Link>

                <Card.Link
                  href="https://reactjs.org/"
                  target="_blank"
                  className="me-3"
                  rel="noreferrer"
                >
                  <OverlayTrigger
                    placement="top"
                    trigger={["hover", "focus"]}
                    overlay={
                      <Tooltip>
                        React · A JavaScript library for building user
                        interfaces.
                      </Tooltip>
                    }
                  >
                    <Image
                      src={ReactLogo}
                      className="image image-sm"
                      alt="ReactJS Logo"
                    />
                  </OverlayTrigger>
                </Card.Link>

                <Card.Link
                  href="https://neo4j.com/"
                  target="_blank"
                  className="me-3"
                  rel="noreferrer"
                >
                  <OverlayTrigger
                    placement="top"
                    trigger={["hover", "focus"]}
                    overlay={
                      <Tooltip>
                        Neo4J · Neo4j gives developers and data scientists the
                        most trusted and advanced tools to quickly build today’s
                        intelligent applications and machine learning workflows.
                        Available as a fully managed cloud service or
                        self-hosted.
                      </Tooltip>
                    }
                  >
                    <Image
                      src={Neo4JLogo}
                      className="image image-sm"
                      alt="Neo4J Logo"
                    />
                  </OverlayTrigger>
                </Card.Link>

                <Card.Link
                  href="https://www.github.com"
                  target="_blank"
                  className="me-3"
                  rel="noreferrer"
                >
                  <OverlayTrigger
                    placement="top"
                    trigger={["hover", "focus"]}
                    overlay={
                      <Tooltip>
                        GitHub - where developers from all over the world share
                        copde , work together and create miracles
                      </Tooltip>
                    }
                  >
                    <Image
                      src={GithubLogo}
                      className="image image-sm"
                      alt="GitHub Logo"
                    />
                  </OverlayTrigger>
                </Card.Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 
the below part */}

      <footer className="footer py-6 bg-dark text-white">
        <Container>
          <Row>
            <Col md={4}>
              <Navbar.Brand
                as={HashLink}
                to="#home"
                className="me-lg-3 mb-3 d-flex align-items-center"
              >
                <Image src={G8Logo} className="image image-sm" alt="G8 Logo" />
                <span className="ms-2 brand-text">G8 Code Scanner</span>
              </Navbar.Brand>
              <p>
                G8 Code Scanner is a free code scanner powered by CodeQL and
                built with ReactJS.
              </p>
            </Col>

            <Col xs={6} md={4} className="mb-5 mb-lg-0">
              <span className="h5">Other</span>
              <ul className="links-vertical mt-2">
                <li>
                  <Card.Link
                    as={Link}
                    to={Routes.DocsQuickStart.path}
                    target="_blank"
                  >
                    Getting started
                  </Card.Link>
                </li>
                <li>
                  <Card.Link as={Link} to={Routes.DocsFAQ.path} target="_blank">
                    FAQ
                  </Card.Link>
                </li>
                <li>
                  <Card.Link
                    as={Link}
                    to={Routes.DocsQuickStart.path}
                    target="_blank"
                  >
                    Terms & Condition
                  </Card.Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} md={4} className="mb-5 mb-lg-0">
              <span className="h5 mb-3 d-block">Feedback</span>
              <form action="#">
                <div className="form-row mb-2">
                  <div className="col-12">
                    <textarea
                      rows="2"
                      cols="42"
                      placeholder="We value your feedback so that we can improve your experience"
                      className="form-control mb-2"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-secondary text-dark shadow-soft btn-block"
                      data-loading-text="Sending"
                    >
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </form>
              <p className="text-muted font-small m-0">
                We’ll never share your details. See our{" "}
                <Card.Link className="text-white" href="#">
                  Privacy Policy
                </Card.Link>
              </p>
            </Col>
          </Row>
          <hr className="bg-gray my-5" />
          <Row>
            <Col className="mb-md-2">
              <Card.Link href="#" className="d-flex justify-content-center">
                <Image
                  src={G8Logo}
                  height={30}
                  className="d-block me-3 mb-3"
                  alt="G8 Logo"
                />{" "}
                <b>G8 Code Scanner</b>
              </Card.Link>
              <div
                className="d-flex text-center justify-content-center align-items-center"
                role="contentinfo"
              >
                <p className="font-weight-normal font-small mb-0">
                  Made by G8 DISM 2021, Sponsored by DSO.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Presentation;
