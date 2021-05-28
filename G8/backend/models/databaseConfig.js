console.log("-----------------------------------------");
console.log("Class: DISM/FT/3A/03");
console.log("-----------------------------------------");
console.log("DISM FYP 2021 GRP 8");
console.log("-----------------------------------------");

// ---------------------------------------------------------
// load modules
// ---------------------------------------------------------
const neo4j = require("neo4j-driver");

// Neo4J Database
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("REDACTED", "REDACTED"),
  {
    /* encrypted: 'ENCRYPTION_OFF' */
  }
);
const session = driver.session();

const query = `
// SHOW DATABASES
CREATE DATABASE SOMEHARDCODEDDATABASEFORNOW
:USE SOMEHARDCODEDDATABASEFORNOW

CREATE (XSSDOM:Query {born:'XSS'}) // QERY

CREATE (A1:Alert {born:"Alert 1"}) // ALERT 1
CREATE (A2:Alert {born:"Alert 2"}) // ALERT 2

CREATE (V1:Vulnerability {born:"code1"}) // Vulnerability 1
CREATE (V2:Vulnerability {born:"code2"}) // Vulnerability 2
CREATE (V3:Vulnerability {born:"code3"}) // Vulnerability 3

CREATE
(A1)-[:Child {roles:['Path1']}]->(XSSDOM),
(A2)-[:Child {roles:['Path1']}]->(XSSDOM),

(V1)-[:Child]->(A1),
(V2)-[:Child]->(A2),
(V3)-[:Child]->(V2)

WITH XSSDOM as q
MATCH (q)<-[:Child*]-(a)<-[:Child*]-(v) RETURN q,a, v;
`;
const params = { name: "Alice" };

session
  .run(query, params)
  .then((result) => {
    result.records.forEach((record) => {
      console.log(record.get("a"));
      console.log(JSON.stringify(record));
      console.log("=======================");
    });
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    session.close();
    driver.close();
  });

// try {
// const result = await session.run(query, params);

// console.log(result);
// console.log(JSON.stringify(result));
// const singleRecord = result.records[0];
// const node = singleRecord.get(0);

// console.log(node.properties.name);
// }
// finally {
// await session.close();
// }

// // on application exit:
// await driver.close()
