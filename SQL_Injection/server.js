const express = require('express');
const {Pool} = require('pg');
require('dotenv').config();

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});
app.get("/user", async (req, res) => {
    const username = req.query.username;

    const query = `
        SELECT id, username
        FROM users
        WHERE username = '${username}'
    `;

    console.log("Executing:", query);

    try {
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
});

app.listen(3000,() => {
    console.log(`App running on http://localhost:3000`);
})