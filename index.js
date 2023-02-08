const express = require("express");
const Sequelize = require("sequelize");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./database");
const { createUserQuery, createFriendRequestQuery } = require("./query");
const userRouter = require("./routes/userRoutes");
connection.query(createUserQuery(), (err, result) => {
  if (err) throw "tables creation failed!";
  else {
    connection.query(createFriendRequestQuery(), (err, result) => {
      if (err) throw "tables creation failed!";
      else console.log("tables created!");
    });
  }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
const port = 8000;
app.post("/", (req, res) => res.send("Hello World!!!! from backend!"));
app.listen(port, () => console.log(`app listening on port ${port}!`));
