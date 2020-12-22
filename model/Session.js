var mongoose = require("mongoose");


var schemasession = new mongoose.Schema({
    _id : String,
    cart:[{
        Product_id: String,
        namePro: String,
        imagePro: String,
        Quality: Number,
        Units: Number,
        Price: Number
    }],
    totalPrice: Number
});
module.exports = mongoose.model("Session", schemasession );