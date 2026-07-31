// Step 1: Create your Bank Server here! (Port 4000)
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const server = express();

server.use(express.urlencoded({extended: true})); // Parse HTML form into req.body
server.use(cookieParser()); // Parses cookie into req.cookies

server.get('/login', (req,res) => {
    res.cookie('sessionId', 'user_secret_session_123', {httpOnly: true, sameSite: 'strict'});
    res.send('Logged In! <a href="/dashboard"> Go to DashBoard </a>');

})

server.get('/dashboard',(req,res) => {
    res.sendFile(path.join(__dirname,'bank.html'));
})

server.post('/transfer',  (req,res) => {

    const {recipient, amount} = req.body;
    const sessionId = req.cookies.sessionId;

    if(!sessionId){
        return res.status(401).send('Unauthorized: Pls login first');

    }
    
        console.log(`[BANK LOG] Transferred ${amount} to ${recipient}`);
        res.send(`Successfully transferred ${amount} to ${recipient}`);

})

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`bank server at http://localhost:${PORT}`);
});
