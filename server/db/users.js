const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({username, password, isAdmin}) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password, "isAdmin")
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username, "isAdmin";
        `, [username, hashedPassword, isAdmin]);
      return user;
  
    } catch (error) {
      console.error(error);
    }
  }

  async function getUser({ username, password }) {
    try {
      const user = await getUserByUsername(username);
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  
      if (user && passwordsMatch) {
        delete user.password;
        return user
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error in getUser: ${error}`);
      throw error;
    }
  }

  async function getUserByUsername(username) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE username=$1
      `, [username]);
  
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserById(userId) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT id, username, "isAdmin" FROM users
        WHERE id=$1
      `, [userId]);
      
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  module.exports = {
    createUser,
    getUser,
    getUserByUsername,
    getUserById
  };