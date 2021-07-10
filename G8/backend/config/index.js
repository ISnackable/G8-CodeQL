/*
    Config stuff \

    where most of the variables are stored for configurations 
*/
console.log("------------------------------------");
console.log("config > index.js");
console.log("------------------------------------");

if (!process.env.DB_USER) {
  console.log(`
\x1b[33mWarning: Some enviroment variable are not set.
------------------------------------
-- CODEQL_HOME: <codeql path>     --
-- DB_HOST: <mariadb hostname>    --
-- DB_NAME: <mariadb db name>     --
-- DB_USER: <mariadb username>    --
-- DB_PWD: <mariadb password>     --
-- NEO_HOST: <neo4j hostname>     --
-- NEO_USER: <neo4j username>     --
-- NEO_PWD: <neo4j password>      --
------------------------------------
\x1b[0m`);
}

const config = {
  port: process.env.PORT ?? "8080",
  db_host: process.env.DB_HOST ?? "localhost",
  db_name: process.env.DB_NAME ?? "g8",
  db_user: process.env.DB_USER ?? "codeql",
  db_pwd: process.env.DB_PWD ?? "codeql",
  neo_host: process.env.NEO_HOST ?? "localhost",
  neo_user: process.env.NEO_USER ?? "neo4j",
  neo_pwd: process.env.NEO_PWD ?? "s3cr3t",
  codeql_home: process.env.CODEQL_HOME ?? "../../codeql",
};

module.exports = config;
