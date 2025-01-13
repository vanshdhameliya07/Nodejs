const mongoose = require(`mongoose`);
const { type } = require("os");
const userschema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
    },
    userpassword: {
        type: String,
        required: true,
    }
})
const u = mongoose.model("user", userschema);
module.exports = u;