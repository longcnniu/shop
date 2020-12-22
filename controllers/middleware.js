
module.exports.aulogin = function (req, res, next) {
    if (!req.cookies.userID) {
        res.redirect("/login")
        return;
    } next();
        
}
module.exports.aulogined = function (req, res, next) {
    if (req.cookies.userID) {
        res.redirect("/admin")
        return;
    } next();
        
}

