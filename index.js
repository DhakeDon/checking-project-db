const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 8080;

console.log("MY_NAME:", process.env.MY_NAME); // <-- this works

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ Connected to DB with webhook');
    console.log("Custom Env:", process.env.MY_NAME); // this also works
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
}

connectDB();

app.get('/', (req, res) => {
  res.send(process.env.MY_NAME);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
