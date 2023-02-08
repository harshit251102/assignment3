const connection = require("./database");
connection.query("CREATE DATABASE IF NOT EXISTS test", (err, result) => {
  if (err) throw "database creation failed!";
  else console.log("database created!");
});
const sql = `use test`;
connection.query(sql, (err, result) => {
  if (err) throw "database selection failed!";
  else console.log("database selected!");
});
function createUserQuery() {
  const sql = `CREATE TABLE IF NOT EXISTS users (
        username VARCHAR(45) PRIMARY KEY,
        firstname VARCHAR(45) NOT NULL,
        lastname VARCHAR(45) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        mobile VARCHAR(36) NOT NULL,
        password VARCHAR(255) NOT NULL,
        gender ENUM('male','female','other') NOT NULL,
        isActive BOOLEAN DEFAULT false NOT NULL
      )`;
  return sql;
}

function createFriendRequestQuery() {
  const sql = `CREATE TABLE IF NOT EXISTS friendRequests (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userA VARCHAR(45) NOT NULL,
        userB VARCHAR(45) NOT NULL,
        status ENUM('pending','accepted') DEFAULT 'pending' NOT NULL,
        isActive BOOLEAN DEFAULT true NOT NULL,
        FOREIGN KEY (userA) REFERENCES users(username),
        FOREIGN KEY (userB) REFERENCES users(username)
      )`;
  return sql;
}
module.exports = { createUserQuery, createFriendRequestQuery };
