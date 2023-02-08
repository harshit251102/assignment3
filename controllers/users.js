const connection = require("../database");
const uuid = require("uuid");

const UserController = {
  getUsers: function (req, res) {
    const sql = "SELECT * FROM users";
    connection.query(sql, function (error, results, fields) {
      if (error) {
        res.status(500).json({
          error: error.message,
        });
      } else {
        res.status(200).json({
          users: results,
        });
      }
    });
  },
  addUser: function (req, res) {
    const { username, firstname, lastname, email, mobile, gender, password } =
      req.body;
    const sql = `
      INSERT INTO users (username, firstname,lastname,email,mobile,gender,password)
      VALUES ('${username}', '${firstname}', '${lastname}', '${email}', '${mobile}','${gender}','${password}')
    `;
    connection.query(sql, function (error) {
      if (error) {
        res.status(500).json({
          error: error.message,
        });
      } else {
        res.status(201).json({
          message: "User added successfully!",
        });
      }
    });
  },
  createRequest: function (req, res) {
    const { userA, userB } = req.params;
    const sql1 = `SELECT * FROM friendrequests WHERE userA='${userA}' AND userB='${userB}'`;
    connection.query(sql1, function (error, results, fields) {
      if (error) res.status(500).json({ error: "db operation failed!" });
      else if (results.length > 0) {
        res.status(500).json({
          error: "request already exists!",
        });
      } else {
        const sql2 = `SELECT * FROM friendrequests WHERE userA='${userB}' AND userB='${userA}'`;
        connection.query(sql2, function (error, results, fields) {
          if (error) res.status(500).json({ error: "db operation failed!" });
          else if (results.length > 0) {
            const sql4 = `UPDATE friendRequests SET status='accepted' WHERE userA='${userB}' AND userB='${userA}'`;
            connection.query(sql4, function (error) {
              if (error)
                res.status(500).json({ error: "db operation failed!" });
              else
                res.status(201).json({
                  message: "request accepted successfully!",
                });
            });
          } else {
            const sql3 = `INSERT INTO friendRequests (userA,userB) VALUES ('${userA}','${userB}')`;
            connection.query(sql3, function (error) {
              if (error)
                res.status(500).json({ error: "db operation failed!" });
              else
                res.status(201).json({
                  message: "request created successfully!",
                });
            });
          }
        });
      }
    });
  },
  getRequests: function (req, res) {
    const { userA } = req.params;
    const sql = `SELECT userA as username FROM friendRequests WHERE userB='${userA}' AND status='pending'`;
    connection.query(sql, function (error, results, fields) {
      if (error) res.status(500).json({ error: "db operation failed!" });
      else
        res.status(200).json({
          requests: results,
        });
    });
  },
  getFriends: function (req, res) {
    const { userA } = req.params;
    const sql = `SELECT * FROM friendRequests WHERE (userB='${userA}' OR userA='${userA}') AND status='accepted'`;
    connection.query(sql, function (error, results, fields) {
      if (error) res.status(500).json({ error: "db operation failed!" });
      else {
        const resultAns = results.map((result) => {
          if (result.userA === userA) {
            return result.userB;
          } else {
            return result.userA;
          }
        });
        res.status(200).json({
          friends: resultAns,
        });
      }
    });
  },
  getSuggestions: function (req, res) {
    const { userA } = req.params;
    const sql = `
    with cte1 as(
      select userA as username from friendRequests where userB='${userA}' and status='accepted' union
      select userB as username from friendRequests where userA='${userA}' and status='accepted'
    ),
    cte2 as(
    select userA as username from friendRequests where userB IN (Select * from cte1) and status='accepted' union
    select userB as username from friendRequests where userA IN (Select * from cte1) and status='accepted'
    ),
    cte3 as(
    select userA as username from friendRequests where userB IN (Select * from cte2) and status='accepted' union
    select userB as username from friendRequests where userA IN (Select * from cte2) and status='accepted'
    ),
    cte4 as
    (
    SELECT username FROM cte3 where username not in (Select * from cte1) and username<>'${userA}'
    UNION SELECT username FROM cte2 where username not in (Select * from cte1) and username<>'${userA}'
    )
    select distinct(username) from cte4;`;

    connection.query(sql, function (error, results, fields) {
      console.log(error);
      if (error) res.status(500).json({ error: "db operation failed!" });
      else {
        res.status(200).json({
          suggestedFriends: results,
        });
      }
    });
  },
};

module.exports = UserController;
