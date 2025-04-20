require("dotenv").config;
const { Pool } = require("pg");

const dbPool = new Pool({
  connectionString: process.env.DB_CONN,
  ssl: {
    rejectUnauthorized: false, // If needed (e.g., Supabase's Postgres)
  },
});

module.exports = {
  dbPool,
};
