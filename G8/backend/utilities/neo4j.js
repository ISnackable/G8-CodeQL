const neo4j = require("neo4j-driver");

// Neo4J Database
// const driver = neo4j.driver(
//   "bolt://neo:7687",
//   neo4j.auth.basic("neo4j", "s3cr3t"),
//   {
//     /* encrypted: 'ENCRYPTION_OFF' */
//   }
// );
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "s3cr3t"),
  {
    /* encrypted: 'ENCRYPTION_OFF' */
  }
);
const session = driver.session();
("use strict");
var _a, _b, _c, _d;
exports.__esModule = true;
var jsonMap = require("json-source-map");
var fs = require("fs");
// var file = fs.readFileSync(
//   "./sarifTestFiles/RMerl_asuswrt-merlin__2021-05-20_17_18_36__export.sarif",
//   "utf8"
// );
var file = fs.readFileSync("./sarifTestFiles/tplink1_snippets.sarif", "utf8");
//var file = fs.readFileSync("./sarifTestFiles/test.sarif", "utf8");
// console.log(file);
var testSarifJson = jsonMap.parse(file).data;
// console.log(testSarifJson.runs);
var results = testSarifJson.runs[0].results;
var driverRules = testSarifJson.runs[0].tool.driver.rules;
// https://betterprogramming.pub/which-is-the-fastest-while-for-foreach-for-of-9022902be15e
// console.time('loop');
// for (let i=0; i<results.length; i++){
//     console.log("================================================================================================");
//     console.log(`> ruleId: ${results[i].ruleId}`);
//     console.log(`> message.text: ${results[i].message.text}`);
//     console.log(`> locations[0].physicalLocation.artifactLocation.uri: ${results[i].locations[0].physicalLocation.artifactLocation.uri}`);
//     console.log(`> locations[0].physicalLocation.region: ${JSON.stringify( results[i].locations[0].physicalLocation.region )}`);
//     console.log(`> locations[0].physicalLocation.contextRegion?.snippet?.text: \n${results[i].locations[0].physicalLocation.contextRegion?.snippet?.text}`);
//     console.log(`> codeFlows?.[0].threadFlows[0].locations: ${results[i].codeFlows?.[0].threadFlows[0].locations ?? "NOTHING"}`);
//     console.log("================================================================================================\n");
// }
// console.timeEnd('loop');

// Global variable for query name
var qNameArr = new Array();
var noOfError = 0,
  noOfWarnings = 0,
  noOfRecommendation = 0;
console.time("forofloop");
var queries = new Array();
var _loop_1 = function (result) {
  var index = driverRules.findIndex(function (x) {
    return x.id === result.ruleId;
  });
  if (!queries.includes(result.ruleId)) {
    queries.push(result.ruleId);
  }
  if (driverRules[index].properties["problem.severity"] === "error") {
    noOfError++;
  } else if (driverRules[index].properties["problem.severity"] === "warning") {
    noOfWarnings++;
  } else if (
    driverRules[index].properties["problem.severity"] === "recommendation"
  ) {
    noOfRecommendation++;
  }
  qNameArr.push(driverRules[index].properties.name);
  console.log(
    "<<==============================++++   QUERY INFO   +++======================================>>"
  );
  console.log("> queryName: " + driverRules[index].properties.name);
  console.log("> queryTags: " + driverRules[index].properties.tags);
  console.log("> queryDescription: " + driverRules[index].fullDescription.text);
  console.log(
    "> querySeverity: " + driverRules[index].properties["problem.severity"]
  );
  console.log(
    "\n-----------------------------------  RESULT INFO ----------------------------------------------------"
  );
  console.log("> ruleId: " + result.ruleId);
  console.log("> message.text: " + result.message.text);
  console.log(
    "> locations[0].physicalLocation.artifactLocation.uri: " +
      result.locations[0].physicalLocation.artifactLocation.uri
  );
  console.log(
    "> locations[0].physicalLocation.region: " +
      JSON.stringify(result.locations[0].physicalLocation.region)
  );
  console.log(
    "> locations[0].physicalLocation.contextRegion?.snippet?.text: \n" +
      ((_b =
        (_a = result.locations[0].physicalLocation.contextRegion) === null ||
        _a === void 0
          ? void 0
          : _a.snippet) === null || _b === void 0
        ? void 0
        : _b.text)
  );
  console.log(
    "> result.codeFlows?.[0].threadFlows[0].locations: " +
      ((_d =
        (_c = result.codeFlows) === null || _c === void 0
          ? void 0
          : _c[0].threadFlows[0].locations) !== null && _d !== void 0
        ? _d
        : "NOTHING")
  );
  console.log(
    "<<==============================================================================================>>\n"
  );
};
for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
  var result = results_1[_i];
  _loop_1(result);
}
console.timeEnd("forofloop");
console.log("number of alerts: " + results.length);
console.log("number of errors: " + noOfError);
console.log("number of warning: " + noOfWarnings);
console.log("number of recommendation: " + noOfRecommendation);
console.log("number of queries " + queries.length);

// ---------------------------------------------------------------------------------------------------------------------

console.log(qNameArr);
// Replaces " " and "-" with "_" in each array element
for (i = 0; i < qNameArr.length; i++) {  
  qNameArr[i] = qNameArr[i].replace(/ /g, "_");
  qNameArr[i] = qNameArr[i].replace(/-/g, "_");
}
// Using Sets to remove duplicate queries in the array
var NoDupeQuery = Array.from(new Set(qNameArr));
console.log(NoDupeQuery);

var CreateQuery = "";

for (a = 0; a < NoDupeQuery.length; a++) {
  CreateQuery += `CREATE (${NoDupeQuery[a]}:Query {born:'${NoDupeQuery[a]}'})\n`;
}

const query =
  `
// SHOW DATABASES
CREATE DATABASE SOMEHARDCODEDDATABASEFORNOW
:USE SOMEHARDCODEDDATABASEFORNOW

` +
  CreateQuery +
  `
CREATE (A1:Alert {born:"Alert 1"})
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
console.log(query);
/*
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
*/
