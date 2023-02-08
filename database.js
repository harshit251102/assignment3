const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456aA#",
  port: "3307",
});
connection.connect((err) => {
  if (err) {
    // throw "database connection failed";
    console.log(
      "database connection failed, please check your database connection"
    )
  } else console.log("database connected!");
});
module.exports = connection;

// async function databaseFunc(){
//     return new Promise(async(resolve,reject)=>{
//         try {

//           await connection.connect();
//           console.log("database connected!");
//           resolve(connection);
//           return {connection:connection,error:null};
//         } catch (err) {
//           reject(err);
//         }
//       })
// }

// module.exports = databaseFunc;
