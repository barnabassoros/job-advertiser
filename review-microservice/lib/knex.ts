import { knex } from "knex";

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.REVIEW_DB_HOST,
    port: parseInt(process.env.REVIEW_DB_PORT as string),
    user: process.env.REVIEW_DB_USER,
    password: process.env.REVIEW_DB_PASSWORD,
    database: process.env.REVIEW_DB_NAME,
  },
});

export default db;
