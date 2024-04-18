const { executeQueryBuilder } = require("./database.js")
const { logger } = require('../utils/logger')


const getUser = async (username) => {
  // get user in users table
  const query = {
    text: 'SELECT * FROM users WHERE username = $1 LIMIT 1',
    values: [username],
  };

  try {
    const result = await executeQueryBuilder(query);
    logger.info('get user result', {result})
    if(result) {
      return result[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

const verifyUser = async (username, password) => {
  // get user in users table
  const query = {
    text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
    values: [username, password],
  };

  try {
    const result = await executeQueryBuilder(query);
    if(result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

const createUser = async (username, password) => {
  // create user in users table
  const userExistsResult = await getUser(username)
  logger.info('userExistsResult', { userExistsResult })
  if(userExistsResult) {
    return { message: 'User already exists' };
  }
  const query = {
    text: 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *',
    values: [username, password],
  };

  try {
    const result = await executeQueryBuilder(query);
    return { message: 'user created successfully', user: result };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }

}


module.exports = {
  createUser,
  getUser,
  verifyUser
};

