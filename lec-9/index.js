const express = require(`express`);

const port = 8000;

const app = express();

const db = require(`./config/db`);
const UserModel=require(`./models/UserModel`)
app.use(express.urlencoded());

app.set(`view engine`, `ejs`)

app.get(`/`, (req, res) => {
    res.render(`form`);
})

app.post(`/adduser`, (req, res) => {
    console.log(req.body);
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server start on port ${port}`);
})