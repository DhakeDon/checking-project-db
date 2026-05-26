const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 8080;

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ Connected to DB');
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
}

connectDB();


// ✅ Root route → only "hi world"
app.get('/', (req, res) => {
  res.send('hi  weebhook on world');
});


// ✅ /roll → show all students data
app.get('/roll', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM students');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
