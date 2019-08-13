import pg from "pg";

const { Pool } = pg;
// the db connection is env variable based @see https://node-postgres.com/features/connecting
const pool = new Pool();

const db = {
  query: (text: string, params?: any) => pool.query(text, params),
};

export default db;
