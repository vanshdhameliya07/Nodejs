const express = require('express');

const port = 8000;

const app = express();

app.set(`view engine`, `ejs`)

app.use(express.urlencoded());

app.get(`/`, (req, res) => {
    res.render(`form`);

})

app.post(`/user`, (req, res) => {
    var { name, email, password } = req.body;
    console.log(req.body)

})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`server start on port http://localhost:${port}`);

})