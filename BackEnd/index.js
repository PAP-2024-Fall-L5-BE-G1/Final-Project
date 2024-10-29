const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

const db = new sqlite3.Database('./flashcards.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database');
    }
});

// this creates the table is not exists and makes the cards table too and links it into the sets table so if the set is deleted, all cards are also deleted with it.

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS sets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    set_id INTEGER,
    FOREIGN KEY (set_id) REFERENCES sets(id) ON DELETE CASCADE
  )`);
});

// this is to add a new set with parameter name
app.post('/api/sets', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO sets (name) VALUES (?)';
    db.run(sql, [name], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name });
    });
});

// this is to add a new card into a set with parameter front, back, and the setId given from the method above
app.post('/api/cards', (req, res) => {
    const { front, back, setId } = req.body;
    const sql = 'INSERT INTO cards (front, back, set_id) VALUES (?, ?, ?)';
    db.run(sql, [front, back, setId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, front, back, setId });
    });
});

// this returns an array of the sets
app.get('/api/sets', (req, res) => {
    const sql = 'SELECT * FROM sets';
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// this returns all the cards inside a setId
app.get('/api/sets/:setId/cards', (req, res) => {
    const { setId } = req.params;
    const sql = 'SELECT * FROM cards WHERE set_id = ?';
    db.all(sql, [setId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});