import { knex } from "knex";

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.REGISTER_DB_HOST,
    port: parseInt(process.env.REGISTER_DB_PORT as string),
    user: process.env.REGISTER_DB_USER,
    password: process.env.REGISTER_DB_PASSWORD,
    database: process.env.REGISTER_DB_NAME,
  },
});

export default db;
