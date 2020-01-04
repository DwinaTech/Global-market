const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getUserByEmail = email => {
  return new Promise(resolve => {
    pool.query(
      "SELECT * FROM users where email = $1",
      [email],
      (error, result) => {
        resolve(result.rows);
      }
    );
  });
};

const createUser = ({ name, email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (name , email, password) values ($1, $2, $3) RETURNING *",
      [name, email, password],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const getUserById = id => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users where user_id = $1",
      [id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const updateUser = ({ name, email, password, userId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET name=$1, email=$2, password=$3 WHERE user_id=${userId}`,
      [name, email, password],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const deleteUser = id => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM users WHERE user_id = ${id} `, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  deleteUser,
  getUserByEmail,
  createUser,
  getUserById,
  getUsers,
  updateUser
};
