import mysql from 'mysql';

const fs = require('fs');
let connection;

export const db = {
   connect: () => {
      connection = mysql.createConnection({
         host: process.env.DB_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASS,
         database: process.env.DB_NAME,
         ssl: {
            // ca: process.env.DB_SSL_CA,
            ca : fs.readFileSync(__dirname + process.env.DB_SSL_CA)
         }
      })
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