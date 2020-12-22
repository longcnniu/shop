var Category = require("../model/Category")
var User = require("../model/User")
var Customer = require("../model/Customer")

module.exports.order = function(req, res){
    Customer.find(function(err,data){
        if(err){
            res.send("" + err)
        } else{
            res.render("orderadmin/order" , {listdata: data})
        }
    })
}
module.exports.vieworder = function(req, res){
    Customer.findOne({_id: req.params.id}, function(err,data){
        if(err){
            res.send("" + err)
        } else{
            res.render("orderadmin/vieworder" , {listdata: data})
        }
    })
}