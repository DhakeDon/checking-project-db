const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 8080;

let db;

// 🔥 Connect to DB
async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ Connected to DB with webhook');
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
}

connectDB();

// 📖 ONLY display roll table
app.get('/roll', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM roll');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Home
app.get('/', (req, res) => {
  res.send('🚀 DB display app running with webhook ehhahhahahahah ');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
