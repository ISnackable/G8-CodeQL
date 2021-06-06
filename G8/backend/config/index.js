/*
    Config stuff \

    where most of the variables are stored for configurations 
*/
console.log("------------------------------------");
console.log("config > index.js");
console.log("------------------------------------");

// ------------------------------------------------------
// load modules
// ------------------------------------------------------
const dotenv = require("dotenv").config();

if (dotenv.error) {
  console.log(`
    -------------------------------------------------------------------------------------
    -- .env not found!                                                                 --
    -- Setup a .env file in the root directory with the following enviroment variable. -- 
    -- backend/.env                                                                    --
    -- Replace <tag> with the appropriate configuration                                --
    --                                                                                 --
    -- EXPRESS_HOSTNAME=<express ip / hostname>                                        --
    -- EXPRESS_PORT=<express port>                                                     --
    -- DB_USER=<database username>                                                     --
    -- DB_PASSWORD=<database passsword>                                                --
    -- DB_NAME=<database name>                                                         --
    -------------------------------------------------------------------------------------
    `);
}

const config = {
  hostname: process.env.EXPRESS_HOSTNAME ?? "localhost",
  port: process.env.EXPRESS_PORT ?? "8080",
  username: process.env.DB_USER ?? "codeql",
  password: process.env.DB_PASSWORD ?? "codeql",
  database: process.env.DB_NAME ?? "g8",
};

module.exports = config;
