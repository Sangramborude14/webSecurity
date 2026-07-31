const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Vulnerable login endpoint
app.get("/login", async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    const query = `
        SELECT id, username
        FROM users
        WHERE username = '${username}'
        AND password = '${password}'
    `;

    console.log("Executing:", query);

    try {
        const result = await pool.query(query);

        if (result.rows.length > 0) {
            return res.json({
                success: true,
                message: "Login successful",
                user: result.rows[0]
            });
        }

        res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Database error"
        });
    }
});

app.listen(3000, () => {
    console.log("App running on http://localhost:3000");
});