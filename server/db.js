const Pool = require("pg").Pool;

const pool = new Pool({
  user: "sanketpatel",
  password: "1316",
  host: "localhost",
  port: 5432,
  database: "pertodo",
});

module.exports = pool;
