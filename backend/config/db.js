const mysql = require('mysql');
require('dotenv').config('../.env');

const dbHost = process.env.DB_IP;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWD;

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  port: dbPort,
  password: dbPassword,
  database: dbName,
});

db.connect((err) => {
  if (err) {
    console.log('db 연결 오류', err);
    return;
  }
  console.log('db 연결 성공');
});

module.exports = db;
