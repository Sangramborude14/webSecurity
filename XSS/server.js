const express = require('express');
const path = require('path');

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

app.get("/search",(req,res) => {
    const query = req.query.q || "";

    res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>  
    <title>Document</title>
</head>
<body>
    <h1>Search</h1>

    <form>
        <input name="q" placeholder="search ..."/>
        <button>
            Search
        </button>
    </form>

    <h2> Results for: <div id='result'></div></h2>

    <p>No result found.</p>
</body>
<script>
document.getElementById('result').textContent = ${query};
</script>
</html>
        `)
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



