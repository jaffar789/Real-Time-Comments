const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM comments', (error, results) => {
        if (error) return res.status(500).json({ error });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { username, comment } = req.body; 
    db.query('INSERT INTO comments (username, comment) VALUES (?, ?)', [username, comment], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(201).json({ id: results.insertId, username, comment }); // Return the inserted data
    });
});

module.exports = router;
