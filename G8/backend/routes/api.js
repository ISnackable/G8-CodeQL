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
 * 1. API root, The / endpoints are used to get information about the API
 * GET / (Get API version information)
 *
 * 2. Projects, The /projects endpoints are used to interact with projects
 * GET /projects (Get a list of projects)
 * POST /projects (Add a project to G8) (uploads)
 * GET /projects/{project-id} (Get project by numeric identifier)
 * DELETE /projects/{project-id} (Delete project by numeric identifier)
 */

// obtain all the projectid to display on the frontend
// router.get("/projects", apiController.projectid);

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

// router.get("/verifySarifFile", apiController.verifySarifFile);

/**
 * 3. Analyses, Most of the /analyses endpoints are used to retrieve the results of analyzing a commit:
 * POST /analyses/{project-id} (Run analysis)
 * GET /analyses/{analysis-id} (Get analysis summary)
 * GET /analyses/{analysis-id}/alerts (Get detailed alert information) application/sarif+json
 */

//
// TODO: add some validation for id paramater
// Create CodeQL database & Query current CodeQl database number in the counter
router.post(
  "/analyses/:id",
  middlewares.idValidation,
  middlewares.createCodeQLDatabase,
  apiController.query
);

// TODO: split database analyze into a middleware
router.get(
  "/analyses/:id",
  apiController.query,
  middlewares.idValidation,
  middlewares.createNeo4J
);

/**
 * 4. Operations, The /operations endpoint is used to track the progress of long-running tasks, for example, code review requests.
 * GET /operations/{operation-id} (Get operation status)
 *
 * Not Important
 * 5. Snapshots, download and upload CodeQL databases
 * GET /snapshots/{project-id}/{language} (Download a snapshot)
 * POST /snapshots/{project-id}/{language} (Start snapshot upload session)
 *
 * 6. Query jobs
 * The /queryjobs endpoint is used to run CodeQL queries on G8 and check their progress.
 * POST /queryjobs (Submit a query to run on one or more projects on G8. The query is included in the body of the request.)
 * GET /queryjobs/{queryjob-id} (Get the status of a query job)
 * GET /queryjobs/{queryjob-id}/results (Provide a summary of results for the projects in the query job)
 * GET /queryjobs/{queryjob-id}/results/{project-id} (Fetch the results of a query job for a specific project)
 *
 * Not Important
 * 7. System, The /system endpoint is used to retrieve information about the status of the system:
 * GET /system/health, (Return an indication of whether the application is working as expected (up) or needs attention (down))
 */

// TODO: Move middlewares.showAllInProjectNeo4J to controllers file, and change the route
router.get("/neo4jshowallinproject/:id", middlewares.showAllInProjectNeo4J);

router.post(
  "/customquery/:id",
  middlewares.idValidation,
  apiController.customQuery
);
module.exports = router; // https://expressjs.com/en/4x/api.html#app.mountpath Explains sub-app mount
