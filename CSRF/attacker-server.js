// Step 1: Create your Attacker Server here! (Port 5000)
const express = require('express');
const path = require('path');
const server = express();

server.get('/win', (req,res) => {
    res.sendFile(path.join(__dirname,'attacker.html'));
});
    
const PORT = 5000;
server.listen(PORT,() => {
    console.log(`attacker server http://localhost:5000`)
})