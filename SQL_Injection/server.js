const express = require("express");
const { Pool } = require("pg");
const bcrypt = require('bcrypt');
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
        SELECT id, username,password
        FROM users
        WHERE username = $1
    `;

    console.log("Executing:", query);

    try {
        const result = await pool.query(query,[username]);

        if(result.rows.length === 0){
            res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });
        }

        const user = result.rows[0];
        
        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordCorrect){
            return res.status(401).json({
                message: "Invalid username or Password"
            });
        }

        res.json({
            success: true,
            message: "Login successfull",
            user: {
                id: user.id,
                username: user.username
            }
        })

        

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