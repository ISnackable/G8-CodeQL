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

// Global variables
var qNameArr = new Array();
var RuleIDArr = new Array();
var FileName = new Array();
var ResultArr = new Array();

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
  FileName.push(result.locations[0].physicalLocation.artifactLocation.uri);

  // RuleID, Query Name
  RuleIDArr.push([result.ruleId, driverRules[index].properties.name]);

  // Query Name
  qNameArr.push(driverRules[index].properties.name);

  ResultArr.push(result);

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

// 0 = Filename
// 1 = RuleID
for (i = 0; i < RuleIDArr.length; i++) {
  RuleIDArr[i][0] = RuleIDArr[i][0].replace(/ /g, "_");
  RuleIDArr[i][0] = RuleIDArr[i][0].replace(/-/g, "_");
  RuleIDArr[i][1] = RuleIDArr[i][1].replace(/ /g, "_");
  RuleIDArr[i][1] = RuleIDArr[i][1].replace(/-/g, "_");
}

var CreateQuery = "";
var NoDupeQuery = Array.from(new Set(qNameArr));
for (a = 1; a <= NoDupeQuery.length; a++) {
  CreateQuery += `CREATE (Q${a}:Query {Query:"${NoDupeQuery[a - 1]}"})\n`;
}

var CFCounter = 1;
var NoDupeFile = Array.from(new Set(FileName));
// 0 = Filename
// 1 = RuleID
// For loop to loop through each different file available
// Create File
for (i = 0; i < NoDupeFile.length; i++) {
  CreateQuery += `\nCREATE (F${i + 1}:File {File:"${NoDupeFile[i]}"})\n`;

  // Checks if current file name is related to the query by comparing rule id
  // Loops through all alerts
  // Create Alert
  for (b = 0; b < ResultArr.length; b++) {
    // If FileName == NoDupeFile
    if (
      ResultArr[b].locations[0].physicalLocation.artifactLocation.uri ==
      NoDupeFile[i]
    ) {
      ResultArr[b].message.text = ResultArr[b].message.text.replace(
        /[\"]/g,
        "'"
      );
      CreateQuery += `CREATE (A${b + 1}:Alert {FileName:'${
        NoDupeFile[i]
      }', RuleID:'${ResultArr[b].ruleId}', Message_Text:"${
        ResultArr[b].message.text
      }", FileLocation:'${
        ResultArr[b].locations[0].physicalLocation.artifactLocation.uri
      }', StartEndLine:'${JSON.stringify(
        ResultArr[b].locations[0].physicalLocation.region
      )}'})\n`;

      // Loops through all queries
      // Create Child
      for (c = 0; c < NoDupeQuery.length; c++) {
        // RuleID is paired with QueryName to create a child
        // CREATE (t)-[:CHILD]->(parent)
        if (RuleIDArr[b][1] == NoDupeQuery[c]) {
          CreateQuery += `CREATE (A${b + 1})-[:Child]->(F${i + 1})\n`;
          CreateQuery += `CREATE (A${b + 1})-[:Child]->(Q${c + 1})\n`;
        }
      } // End of Create Child

      if (ResultArr[b].hasOwnProperty("codeFlows")) {
        var CodeFlowLen = ResultArr[b].codeFlows.length - 1;

        // Loops through all Code Flow arrays
        // Create Code Flow
        for (
          z = 0;
          z <
          ResultArr[b].codeFlows[CodeFlowLen].threadFlows[0].locations.length;
          z++
        ) {
          // Code Flow Message Text
          var CFMsg =
            ResultArr[b].codeFlows[CodeFlowLen].threadFlows[0].locations[z]
              .location.message.text;

          // Code Flow Context Region
          var CFStartEnd =
            "StartLine: " +
            ResultArr[b].codeFlows[CodeFlowLen].threadFlows[0].locations[z]
              .location.physicalLocation.contextRegion.startLine +
            ", EndLine: " +
            ResultArr[b].codeFlows[CodeFlowLen].threadFlows[0].locations[z]
              .location.physicalLocation.contextRegion.endLine;
          
          // Replaces " with ' to avoid conflicts/errors
          CFMsg = CFMsg.replace(/[\"]/g, "'");
          CreateQuery += `CREATE (CF${CFCounter}:CodeFlows {Message:"${CFMsg}", StartEndLine:'${CFStartEnd}'})\n`;
          // Create Code Flow Childs
            if(z==0) { // Checks if in a new loop (Creating code flows for another Alert)
              // Creates Child for current Alert it is looping on
              CreateQuery += `CREATE (CF${CFCounter})-[:Child]->(A${b+1})\n`
            }
            else {
              CreateQuery += `CREATE (CF${CFCounter-1})-[:Child]->(CF${CFCounter})\n`
            }
          CFCounter++;
        }
      }
    } // End of Create Alert If Loop
  } // End of Create Alert For Loop
} // End of Create File Loop


const query =
  `
// SHOW DATABASES
CREATE DATABASE SOMEHARDCODEDDATABASEFORNOW
:USE SOMEHARDCODEDDATABASEFORNOW

` +
CreateQuery + "\n"
  `


  OPTIONAL MATCH (q)<-[:Child*0..]-(a)<-[:Child*0..]-(v)
  WHERE q:Query
  RETURN q, a, v
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
