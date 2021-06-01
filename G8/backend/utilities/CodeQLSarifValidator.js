"use strict";
// Generated by https://quicktype.io
// https://help.semmle.com/lgtm-enterprise/user/help/sarif-results-file.html
exports.__esModule = true;
exports.Precision = exports.Kind = exports.Severity = exports.Level = exports.URIBaseID = void 0;
var URIBaseID;
(function (URIBaseID) {
    URIBaseID["Srcroot"] = "%SRCROOT%";
})(URIBaseID = exports.URIBaseID || (exports.URIBaseID = {}));
var Level;
(function (Level) {
    Level["Error"] = "error";
    Level["Note"] = "note";
    Level["Warning"] = "warning";
})(Level = exports.Level || (exports.Level = {}));
var Severity;
(function (Severity) {
    Severity["Error"] = "error";
    Severity["Warning"] = "warning";
    Severity["Recommendation"] = "recommendation";
})(Severity = exports.Severity || (exports.Severity = {}));
var Kind;
(function (Kind) {
    Kind["PathProblem"] = "path-problem";
    Kind["Problem"] = "problem";
})(Kind = exports.Kind || (exports.Kind = {}));
var Precision;
(function (Precision) {
    Precision["High"] = "high";
    Precision["Medium"] = "medium";
    Precision["VeryHigh"] = "very-high";
})(Precision = exports.Precision || (exports.Precision = {}));
