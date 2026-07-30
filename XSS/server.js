const express = require('express');
const path = requrie('path');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));

let comments = [];

app.post("/comment", (req,res) => {
    comments.push(req.body.comments);
    res.redirect("/");
});

app.get("/comments",(req,res) => {
    res.json(comments);
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

