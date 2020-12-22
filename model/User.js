var mongoose = require("mongoose");

var schemapass = new mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    loginid: String
});
module.exports = mongoose.model("User", schemapass );