const express = require('express');
const app = express();

const PORT = 5000;

app.get(`/api/data`, (req,res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    
    res.json({message: `Hello from backend`})
})

app.post(`/api/credentials`, (req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Credentials',true);
    res.json({message: 'Credential Endpoint Called'});
})

app.options('/api/preflight',(req,res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
    res.sendStatus(204);
})

app.put(`/api/preflight`, (req,res) => {
    res.setHeader(`Access-Control-Allow-Origin`,'http://localhost:3000');
    res.json({message: `PUT request succesfull`});
})

app.listen(PORT, () => {
    console.log(`backend is running on http://localhost:${PORT}`);
});