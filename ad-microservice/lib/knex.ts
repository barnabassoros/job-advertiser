import { knex } from "knex";
const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.AD_DB_HOST,
    port: parseInt(process.env.AD_DB_PORT as string),
    user: process.env.AD_DB_USER,
    password: process.env.AD_DB_PASSWORD,
    database: process.env.AD_DB_NAME,
  },
});

export default db;