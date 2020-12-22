var mongoose = require("mongoose");

var schemacategory = new mongoose.Schema({

    nameCategory: String,
    
});
module.exports = mongoose.model("Category", schemacategory );