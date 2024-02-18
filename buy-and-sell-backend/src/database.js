const mysql = require('mysql2');

let connection;

const db = {
   connect: () => {
      connection = mysql.createConnection(process.env.DB_URL)
      connection.connect();
   },
   query: (queryString, escapedValues) =>
      new Promise((resolve, reject) => {
         connection.query(queryString, escapedValues, (error, results, fields) => {
            if (error) reject(error);
            resolve({ results, fields })
         })
      }),
   end: () => connection.end()
}
module.exports = { db };