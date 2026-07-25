const express = require('express');
const app = express();

const PORT = 5000;

app.get(`/api/data`, (req,res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.json({message: `Hello from backend`})
})

app.put(`api/preflight`, (req,res) => {
    res.setHeader(`Access-Control-Allow-Origin`,'http://localhost:3000');
    res.json({message: `PUT request succesfull`});
})

app.listen(PORT, () => {
    console.log(`backend is running on http://localhost:${PORT}`);
});