import { knex } from "knex";
const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.AUTH_DB_HOST,
    port: parseInt(process.env.AUTH_DB_PORT as string),
    user: process.env.AUTH_DB_USER,
    password: process.env.AUTH_DB_PASSWORD,
    database: process.env.AUTH_DB_NAME,
  },
});

export default db;