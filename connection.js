const Pool = require("pg").Pool;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Urbancom2022",
  database: "venteprivee",
});
module.exports = pool;
