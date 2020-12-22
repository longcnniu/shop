var Session = require("../model/Session")
var shortid = require('shortid');

module.exports = function(req, res, next){
    if(!req.session.views){
        req.session.views = shortid.generate();
        var session = Session({
            _id: req.session.views,
        });
        session.save(function (err) {
            if (err) {
                res.json({ "kq": 01, "errMsg": err });
            } 
        })       
    } next();
}