var mongoose = require("mongoose");

var schemaproduct = new mongoose.Schema({

    nameProduct: String,
    cateProduct: String,
    priceProduct: Number,
    imgProduct: String
});
module.exports = mongoose.model("Product", schemaproduct );