// Create and query CodeQL databases, or work with the QL language
console.log("------------------------------------");
console.log("helpers > codeQL.js");
console.log("------------------------------------");

// --------------------------------------------------
// load modules
// --------------------------------------------------
const { spawn } = require("child_process");
const { Reset, FgGreen } = require("../constants");
const config = require("../config");

/**
 * Create a CodeQL database for a source tree that can be analyzed using one of the CodeQL products
 * @param {string} output - Path to the CodeQL database to create.
 * @param {string} sourceRoot - The root source code directory
 * @param {string} language - The language that the new database will be used to analyze
 * @param {function} callback - Callback function with {code}, {scriptOutput} parameter
 * @return {}
 */
const createDatabase = (
  output,
  sourceRoot,
  language = "javascript",
  callback
) => {
  console.log(FgGreen, `codeQL.createDatabase()`, Reset);

  // This part is to setup the codeql command line
  // This array are the arguments that are passed to the codeql command
  const args = [
    "database",
    "create",
    output, // database name to be created
    `--source-root=${sourceRoot}`, // source code folder
    `--language=${language}`, // programming language this makes it support both javascript and python
    "--threads=0",
  ];

  //This part is to setup the codeql command line
  console.log("Starting CodeQL Process.");
  // Declaring a child variable to use for troubleshooting
  const child = spawn("codeql", args);

  var scriptOutput = "";

  // for debugging purposes only
  child.stdout.on("data", function (data) {
    data = data.toString();
    console.log("[STDOUT]: ", data);

    scriptOutput += data;
  });
  child.stderr.on("data", function (data) {
    data = data.toString();

    console.log("[STDERR]: ", data);
    scriptOutput += data;
  });
  child.on("close", function (code) {
    return callback(code, scriptOutput);
  });

  return output;
};

/**
 * Analyze a database, producing meaningful results in the context of the source code
 * @param {string} database - Path to the CodeQL database to bundle
 * @param {string} query -   Path to the queries to execute
 * @param {string} output -  The output path to write results to
 * @param {function} callback - Callback function with {code}, {scriptOutput} parameter
 * @return {}
 */
const analyzeDatabase = (
  database,
  query,
  output,
  callback
) => {
  console.log(FgGreen, `codeQL.analyzeDatabase()`, Reset);
  console.log("CodeQL database to analyze:", database);
  console.log("QL query to use:", query);
  console.log("Sarif output file:", output);

  // This array are the arguments that are passed to the codeql command
  var args = [
    "database",
    "analyze",
    database, // our database to scan
    query, // This is where you can change the default qls to scan
    "--format=sarifv2.1.0", // set the result output to SARIF v2.1.0 format
    "--sarif-add-snippets", // include code snippets for each location mentioned in the results
    `--output=${output}`, // output file as id.sarif in ./SarifFiles/
    `--search-path=${config.codeql_home ?? "../../codeql"}`,
    "--threads=0",
  ];

  if (query.includes("CustomQuery.ql")) args.push("--rerun");

  console.log("Starting CodeQL Process.");
  // Declaring a child variable to use for troubleshooting
  const child = spawn("codeql", args);

  var scriptOutput = "";

  // for debugging purposes only
  child.stdout.on("data", function (data) {
    data = data.toString();
    console.log("[STDOUT]: ", data);

    scriptOutput += data;
  });
  child.stderr.on("data", function (data) {
    data = data.toString();

    console.log("[STDERR]: ", data);
    scriptOutput += data;
  });
  child.on("close", function (code) {
    return callback(code, scriptOutput);
  });

  return output;
};

/**
 * Create a relocatable archive of a CodeQL database.
 * @param {string} database - Path to the CodeQL database to bundle
 * @param {string} output -  The output file, typically with the extension ".zip".
 * @param {function} callback - Callback function with {code}, {scriptOutput} parameter
 * @return {}
 */
const createSnapshot = (database, output, callback) => {
  console.log(FgGreen, `codeQL.createSnapshot()`, Reset);

  // This array are the arguments that are passed to the codeql command
  const args = ["database", "bundle", `--output=${output}`, database];
  console.log("CodeQL database to bundle:", database);
  console.log("Snapshot output file:", output);

  console.log("Starting CodeQL Process.");
  const child = spawn("codeql", args);

  var scriptOutput = "";

  // for debugging purposes only
  child.stdout.on("data", function (data) {
    data = data.toString();
    console.log("[STDOUT]: ", data);

    scriptOutput += data;
  });
  child.stderr.on("data", function (data) {
    data = data.toString();

    console.log("[STDERR]: ", data);
    scriptOutput += data;
  });
  child.on("close", function (code) {
    return callback(code, scriptOutput);
  });

  return output;
};

exports.createDatabase = createDatabase;
exports.analyzeDatabase = analyzeDatabase;
exports.createSnapshot = createSnapshot;
