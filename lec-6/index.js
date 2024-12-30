const express = require(`express`);

const port = 9000;

const app = express();

const record = [];

app.set(`view engine`, `ejs`)
app.use(express.urlencoded())

app.get(`/add`, (req, res) => {
    res.render(`form`);
})
app.get(`/`, (req, res) => {
    return res.render(`table`,{
        record
    })
})

app.post(`/adduser`, (req, res) => {
    const { username, userphone } = req.body;
    console.log(req.body)

    const obj = {
        name: username,
        phone: userphone,
    }
    record.push(obj);
    console.log(`user successfully register`)
    return res.redirect(`/`);

})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`port is start on :- ${port}`);
})
