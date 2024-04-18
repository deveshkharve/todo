const { Pool } = require('pg');
const { logger } = require('../utils/logger')
// Configure PostgreSQL connection
const connectionString = 'postgresql://app:5eO9xBEh076y0LuQ04F2v0Vd@instantly-mutual-sawfish.a1.pgedge.io/defaultdb?sslmode=require';


const pool = new Pool({
  connectionString: connectionString
  // user: 'your_user',
  // host: 'localhost',
  // database: 'your_database',
  // password: 'your_password',
  // port: 5432, // Default PostgreSQL port
});

// Create users table
pool.query(`CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

// Create tasks table
pool.query(`CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

const executeQueryBuilder = async (query, params) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    logger.error('Unable to execute postgres query', {
      errorMessage: error.message,
      query
    });
    throw error;
  }
};

module.exports = {
  executeQueryBuilder
}
