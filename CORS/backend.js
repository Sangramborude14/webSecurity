const express = require('express');
const app = express();

const PORT = 5000;

app.get(`/api/data`, (req,res) => {
    res.json({message: `Hello from backend`})
})

app.listen(PORT, () => {
    console.log(`backend is running on http://localhost:${PORT}`);
});