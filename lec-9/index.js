const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/db');

const UserModel = require('./models/UserModel');

app.use('/uploads', express.static('uploads'));

const multer = require('multer');

app.set(`view engine`, `ejs`);

app.use(express.urlencoded());


app.get(`/`, (req, res) => {
    return res.render(`form`);
})

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const imageupload = multer({ storage: st }).single('image');

app.post('/adduser', (req, res) => {
    const { name, email, password, gender, hobby, city, image } = req.body;
    console.log(req.file);

    UserModel.create({
        username: name,
        useremail: email,
        userpassword: password,
        gender: gender,
        hobby: hobby,
        city: city,
        image: image
    }).then((record) => {
        console.log(record);
        console.log('user create');
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.get(`/deleteid`, (req, res) => {
    let id = req.query.did;
    UserModel.findByIdAndDelete(id)
        .then((data) => {
            console.log('record deleted');
            return res.redirect('/viewuser');
        }).catch((err) => {
            console.log(err);
            return false;
        })

})

app.get('/edituser', (req, res) => {
    let id = req.query.eid;
    UserModel.findById(id)
        .then((single) => {
            return res.render('edit', {
                single
            });
        })
        .catch((err) => {
            console.log(err);
            return false;
        })
})

app.post(`/updateuser`, (req, res) => {
    const { editid, name, email, password, gender, hobby, city } = req.body;

    UserModel.findByIdAndUpdate(editid, {
        username: name,
        useremail: email,
        userpassword: password,
        gender: gender,
        hobby: hobby,
        city: city,
    }).then((user) => {
        console.log(`user updated`);
        return res.redirect('/viewuser');
    })
        .catch((err) => {
            console.log(err);
            return false;
        })

})

app.get(`/viewuser`, (req, res) => {
    UserModel.find({})
        .then((record) => {
            return res.render('table', {
                allrecord: record
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server start on port ${port}`);
})