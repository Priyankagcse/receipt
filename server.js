const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    // res.setHeader("Access.Control.Allow.Credentials", "true");
    res.send('Welcome');
});

app.get("/priya", (req, res) => {
    // res.setHeader("Access.Control.Allow.Credentials", "true");
    res.send('priya');
});

app.get("/priyanka", (req, res) => {
    // res.setHeader("Access.Control.Allow.Credentials", "true");
    res.send('priyanka');
});

app.listen(5000, () => {
    console.log('Running on port 5000');
});
