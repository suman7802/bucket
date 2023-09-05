require("dotenv").config();
const {Client, Pool} = require("pg");

// for local dataBase

// const pool = new Client({
//   host: process.env.HOST,
//   database: process.env.DATABASE_NAME,
//   port: process.env.DATABASE_PORT,
//   user: process.env.USER,
// });

// for deployed dataBase

const pool = new Pool({
  connectionString: process.env.DBConfigLink,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`connected to db successfully`);
  }
});

module.exports = pool;
