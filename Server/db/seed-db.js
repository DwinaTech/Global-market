const { Pool } = require("pg");
const config = require("../config");
const fs = require("fs");

const createSchema = fs
  .readFileSync(require.resolve("./schema/recreate-schema.sql"))
  .toString();
const pool = new Pool(config);

queryDb(createSchema)
  .then(() => console.log("schema created successfully"))
  .then(() => process.exit(0));

function queryDb(query) {
  return new Promise((resolve, error) => {
    pool.query(query, function(err) {
      if (err) {
        console.log("error: ", err);
        error(err);
        process.exit(1);
      }
      resolve();
    });
  });
}