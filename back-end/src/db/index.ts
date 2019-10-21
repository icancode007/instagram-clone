import pg, { QueryResult } from "pg";

const { Pool } = pg;
// the db connection is env variable based @see https://node-postgres.com/features/connecting
const pool = new Pool();

const db = {
  query: (text: string, params?: any): Promise<QueryResult> => {
    return pool.query(text, params);
  }
};

export default db;
