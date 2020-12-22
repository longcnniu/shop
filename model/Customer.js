var mongoose = require("mongoose");

var schemacus = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    phone: String,
    address: String,
    product:[{
        Product_id: String,
        namePro: String,
        Quality: Number,
        Units: Number,
        Price: Number
    }],
    total: Number,
    date: String
    
    
});
module.exports = mongoose.model("Customer", schemacus );