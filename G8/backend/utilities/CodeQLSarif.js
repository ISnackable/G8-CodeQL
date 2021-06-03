"use strict";
var _a, _b, _c, _d;
exports.__esModule = true;
var jsonMap = require("json-source-map");
var fs = require("fs");
// const file = fs.readFileSync(
//   "./sarifTestFiles/RMerl_asuswrt-merlin__2021-05-20_17_18_36__export.sarif",
//   "utf8"
// );
var file = fs.readFileSync("./sarifTestFiles/tplink1.sarif", 'utf8');
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
var noOfError = 0, noOfWarnings = 0, noOfRecommendation = 0;
console.time("forofloop");
var queries = new Array();
var _loop_1 = function (result) {
    var index = driverRules.findIndex(function (x) { return x.id === result.ruleId; });
    if (!queries.includes(result.ruleId)) {
        queries.push(result.ruleId);
    }
    if (driverRules[index].properties["problem.severity"] === "error") {
        noOfError++;
    }
    else if (driverRules[index].properties["problem.severity"] === "warning") {
        noOfWarnings++;
    }
    else if (driverRules[index].properties["problem.severity"] === "recommendation") {
        noOfRecommendation++;
    }
    console.log("<<==============================++++   QUERY INFO   +++======================================>>");
    console.log("> queryName: " + driverRules[index].properties.name);
    console.log("> queryTags: " + driverRules[index].properties.tags);
    console.log("> queryDescription: " + driverRules[index].fullDescription.text);
    console.log("> querySeverity: " + driverRules[index].properties["problem.severity"]);
    console.log("\n-----------------------------------  RESULT INFO ----------------------------------------------------");
    console.log("> ruleId: " + result.ruleId);
    console.log("> message.text: " + result.message.text);
    console.log("> locations[0].physicalLocation.artifactLocation.uri: " + result.locations[0].physicalLocation.artifactLocation.uri);
    console.log("> locations[0].physicalLocation.region: " + JSON.stringify(result.locations[0].physicalLocation.region));
    console.log("> locations[0].physicalLocation.contextRegion?.snippet?.text: \n" + ((_b = (_a = result.locations[0].physicalLocation.contextRegion) === null || _a === void 0 ? void 0 : _a.snippet) === null || _b === void 0 ? void 0 : _b.text));
    console.log("> result.codeFlows?.[0].threadFlows[0].locations: " + ((_d = (_c = result.codeFlows) === null || _c === void 0 ? void 0 : _c[0].threadFlows[0].locations) !== null && _d !== void 0 ? _d : "NOTHING"));
    console.log("<<==============================================================================================>>\n");
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