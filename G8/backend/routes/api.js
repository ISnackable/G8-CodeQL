console.log("------------------------------------");
console.log("routes > api.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const apiController = require("../controllers/apiController");
const middlewares = require("../middlewares");

const createProjectLimiter = rateLimit({
  windowMs: 1 * 10 * 1000, // 10 seconds
  max: 2, // limit each IP to 2 requests per windowMs
  message:
    "Too many project created from this IP, please try again after an hour",
});
// ------------------------------------------------------
// end points
// ------------------------------------------------------
/**
 * === API SPECIFICATIONS ===
 *
 * 1. Projects, The /projects endpoints are used to interact with projects
 * GET /projects (Get a list of projects)
 * POST /projects (Add a project to G8) (uploads)
 * GET /projects/{project-id} (Get project by numeric identifier)
 * DELETE /projects/{project-id} (Delete project by numeric identifier)
 */

// obtain all the information on the previous projects ( id , name and hash )
router.get("/projects", apiController.getProject);

// get project by numeric identifier
router.get(
  "/projects/:id",
  middlewares.idValidation,
  apiController.getProjectById
);

// upload project with multer
router.post(
  "/projects/folder",
  createProjectLimiter,
  apiController.folderUpload,
  middlewares.checkDuplicateProject
);

// upload project with git
router.post("/projects/repo", createProjectLimiter, apiController.repoUpload);

// delete project
router.delete(
  "/projects/:id",
  middlewares.idValidation,
  apiController.deleteProject
);

/**
 * 2. Analyses, Most of the /analyses endpoints are used to retrieve the results of analyzing a commit:
 * POST /analyses/{project-id} (Run analysis)
 * GET /analyses/{project-id} (Get detailed alert information) application/sarif+json
 */

//
// Create CodeQL database & Query current CodeQl database number in the counter
router.post(
  "/analyses/:id",
  middlewares.idValidation,
  middlewares.checkProcessing,
  middlewares.createCodeQLDatabase,
  apiController.query
);

// Get the result of CodeQL sarif by Project ID
router.get(
  "/analyses/:id",
  middlewares.idValidation,
  apiController.getAnalysesById,
  middlewares.createNeo4J
);

/*
 * 3. Snapshots, download CodeQL databases
 * codeql database bundle --output=<output> [--mode=<mode>] <options>... [--] <database>
 * GET /snapshots/{project-id} (Download a snapshot)
 */

// Download CodeQL database archive
router.get(
  "/snapshots/:id",
  middlewares.idValidation,
  apiController.getSnapshots
);

/*
 * 4. Query jobs
 * The /queryjobs endpoint is used to run CodeQL queries on G8 and check their progress.
 * POST /queryjobs/{project-id} (Submit a query to run on one or more projects on G8. The query is included in the body of the request.)
 */

// Submit a custom CodeQL query
router.post(
  "/queryjobs/:id",
  middlewares.idValidation,
  apiController.customQuery
);

// Endpoint for getting neo4j data
router.get(
  "/neo4jshowallinproject/:id",
  middlewares.idValidation,
  apiController.showAllInProjectNeo4J
);

module.exports = router; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount
