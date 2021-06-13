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
var RuleIDArr = new Array();
var ResultMsgTxtArr = new Array();
var FileLocArr = new Array();
var LocRegionArr = new Array();
var LocContextArr = new Array();
var WarningArr = new Array();
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
  RuleIDArr.push(result.ruleId);
  ResultMsgTxtArr.push(result.message.text);
  qNameArr.push(driverRules[index].properties.name);
  FileLocArr.push(result.locations[0].physicalLocation.artifactLocation.uri);
  LocRegionArr.push(
    JSON.stringify(result.locations[0].physicalLocation.region)
  );
  LocContextArr.push(
    (_b =
      (_a = result.locations[0].physicalLocation.contextRegion) === null ||
      _a === void 0
        ? void 0
        : _a.snippet) === null || _b === void 0
      ? void 0
      : _b.text
  );
  if (driverRules[index].properties["problem.severity"] == "warning") {
    WarningArr.push(result.ruleId);
  }

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

// Replaces " " and "-" with "_" in each array element
for (i = 0; i < qNameArr.length; i++) {
  qNameArr[i] = qNameArr[i].replace(/ /g, "_");
  qNameArr[i] = qNameArr[i].replace(/-/g, "_");
}
for (i = 0; i < RuleIDArr.length; i++) {
  RuleIDArr[i] = RuleIDArr[i].replace(/ /g, "_");
  RuleIDArr[i] = RuleIDArr[i].replace(/-/g, "_");
}
// Using Sets to remove duplicate queries in the array
var NoDupeQuery = Array.from(new Set(qNameArr));

// Create Query
var CreateQuery = "";
for (a = 1; a <= NoDupeQuery.length; a++) {
  CreateQuery += `CREATE (Q${a}:Query {Query:'${NoDupeQuery[a - 1]}'})\n`;
}

// Create Alerts 
var CreateAlert = "";
for (b = 1; b <= results.length; b++) {
  CreateAlert += `CREATE (A${b}:ALERT {RuleID:"${
    RuleIDArr[b - 1]
  }", Message_Text:"${ResultMsgTxtArr[b - 1]}", FileLocation:"${
    FileLocArr[b - 1]
  }, StartEndLine:"${LocRegionArr[b - 1]}
  }"})\n`;
}

// Replaces " " and "-" to "_" in WarningArr
for (i = 0; i < WarningArr.length; i++) {
  WarningArr[i] = WarningArr[i].replace(/ /g, "_");
  WarningArr[i] = WarningArr[i].replace(/-/g, "_");
}

// Removes duplicate elements
var NoDupeVuln = Array.from(new Set(WarningArr));

// Create Vulnerability
// Only adds in vulnerability if querySeverity is "warning"
var CreateVuln = "";
for (c = 1; c <= NoDupeVuln.length; c++) {
  CreateVuln += `CREATE (V${c}:Vulnerability {Vuln:"${NoDupeVuln[c - 1]}"})\n`;
}

// Create Child
var CreateChild = "CREATE ";
var ChildVar = new Array();

// Loops through all query names
for (d = 1; d <= qNameArr.length; d++) {
  // Loops query query names without duplicates
  for (e = 1; e <= NoDupeQuery.length; e++) {
    // Query names are in fixed order on how the program was run
    // Takes the position of the query in NoDupeQuery and adds it to ChildVar for creation of the Child
    if (qNameArr[d - 1] == NoDupeQuery[e - 1]) {
      ChildVar.push(`Q${e}`);
    }
  }
}

// Loops through all alerts to create a child with the associated query
for (f = 1; f <= results.length; f++) {
  CreateChild += `(A${f}-[:Child {AlertNum:"A${f}", AlertName:"${
    RuleIDArr[f - 1]
  }"} ]->(${ChildVar[f - 1]}),\n`;
}

// Create Child>Vulnerability
var VulnChildArr = new Array();
for (g = 1; g <= RuleIDArr.length; g++) {
  for (h = 1; h <= NoDupeVuln.length; h++) {
    if (RuleIDArr[g - 1] == NoDupeVuln[h - 1]) {
      VulnChildArr.push(`V${h}`);
    }
  }
}

var VulnChild = "";
for (x = 1; x <= RuleIDArr.length; x++) {
  for (y = 1; y <= WarningArr.length; y++) {
    if (RuleIDArr[x - 1] == WarningArr[y - 1]) {
      VulnChild += `(${VulnChildArr[y - 1]}-[:Child]->A${x}),\n`;
      break;
    }
  }
}

const query =
  `
// SHOW DATABASES
CREATE DATABASE SOMEHARDCODEDDATABASEFORNOW
:USE SOMEHARDCODEDDATABASEFORNOW

` +
  CreateQuery +
  "\n" +
  CreateAlert +
  "\n" +
  CreateVuln +
  "\n" +
  CreateChild +
  "\n" +
  VulnChild +
  "\n" +
  `

CREATE


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
