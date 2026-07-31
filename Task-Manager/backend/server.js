const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json()) // allows JSON request to be sent

app.get('/submit',(req,res) => {
    const data = req.body;
    res.send(`Your message has been recieved`)
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})