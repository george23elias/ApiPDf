import pg from "pg";
import {
  db_database,
  db_host,
  db_password,
  db_port,
  db_user,
} from "../config/config.js";

const pool = new pg.Pool({
  user: db_user,
  host: db_host,
  database: db_database,
  password: db_password,
  port: db_port,
});

// pool.query("select now()").then((result) => {
//     console.log(result);
//   });
export default pool;
