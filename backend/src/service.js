const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database').connection;

async function createUser(username, email, password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const emailCheckSql = 'SELECT * FROM users WHERE email = ?';
  const emailCheckValues = [email];

  return new Promise((resolve, reject) => {
    db.query(emailCheckSql, emailCheckValues, async (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length > 0) {
        resolve('Email already in use');
      } else {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const values = [username, email, hashedPassword];

        db.query(sql, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
}

async function authenticateUser(email, password) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const values = [email];

  return new Promise((resolve, reject) => {
    db.query(sql, values, async (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 0) {
        resolve(null);
      } else {
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          resolve(null);
        } else {
          const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
            expiresIn: '1h',
          });
          resolve(token);
        }
      }
    });
  });
}

module.exports = {
  createUser,
  authenticateUser,
};
