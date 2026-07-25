// Step 1: Create your frontend server here!
const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;


app.get('/',(req,res,next) => {
    return res.sendFile(path.join(__dirname,'index.html'));
})

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`);

})