import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";
import { Table } from "@themesberg/react-bootstrap";
// import { Image, Table } from "@themesberg/react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const DocsGlossary = () => (
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2" id="glossary">
                G8 Glossary
              </h1>

              <Table striped bordered>
                <thead className="thead-light">
                  <tr>
                    <th className="border-0">Term</th>
                    <th className="border-0">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-0">G8</td>
                    <td className="border-0 fw-bold">
                      The name of the group that built this source code scanning
                      tool. Also known as Group 8.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Query Language</td>
                    <td className="border-0 fw-bold">
                      Language used by database software. Learning the query
                      language allows for writing of queries from scratch.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Query</td>
                    <td className="border-0 fw-bold">
                      A set of instructions used to retrieve information from a
                      database.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">CodeQL</td>
                    <td className="border-0 fw-bold">
                      The analysis engine used by G8 to automate source code
                      scanning.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Source code</td>
                    <td className="border-0 fw-bold">
                      Main source of the computer program that contains
                      instructions which tell the program how to function.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Vulnerabilities</td>
                    <td className="border-0 fw-bold">
                      A flaw or weakness which occurs in an information system,
                      program, security procedures or implementations{" "}
                      <div className="pagebreak"></div> that can be exploited or
                      triggered by a threat source.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">CVE List </td>
                    <td className="border-0 fw-bold">
                      A list of records , each containing an identification
                      number , description, and public reference for publicly
                      known <div className="pagebreak"></div> cybersecurity
                      vulnerabilities.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Bugs</td>
                    <td className="border-0 fw-bold">
                      Commonly known as “errors”, bugs are an unexpected defect,
                      fault, flaw or imperfection in a computer program or{" "}
                      <div className="pagebreak"></div>
                      system.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Patches</td>
                    <td className="border-0 fw-bold">
                      A repair job for a piece of programming . An immediate
                      solution to previously known flaws in a program . Commonly{" "}
                      <div className="pagebreak"></div>
                      known as a “fix”.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-0">Repository</td>
                    <td className="border-0 fw-bold">
                      A database service capable of storing information. E.g.
                      GitHub Repository
                    </td>
                  </tr>
                </tbody>
              </Table>

            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DocsGlossary;