var Product = require("../model/Product")
var Category = require("../model/Category")
var User = require("../model/User")
var shortid = require('shortid');
var multer = require('multer');
const { db, getMaxListeners, findOne } = require("../model/Product");
const { render } = require("ejs");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if (file.mimetype == "image/bmp" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true)
        } else {
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("imgPro");

module.exports.addProduct = function (req, res) {
    Category.find(function (err, data) {
        if (err) {
            res.json({ "kq": 0, "errMsg": err });
        } else {
            res.render("product/add", { listcategory: data, errs1: req.flash('message') });
        }
    })
};
module.exports.postAddProduct = function (req, res) {
    upload(req, res, function (err) {

        if (!req.file) {
            var product = Product({
                nameProduct: req.body.namePro,
                cateProduct: req.body.catePro,
                priceProduct: req.body.pricePro,
            });
            product.save(function (err) {
                if (err) {
                    req.flash('message', 'thêm hình thất bại');
                    res.redirect('/admin/product/add')
                    return;
                } else {
                    req.flash('message', 'Thêm thành Công');
                    res.redirect('/admin/product')
                    return;
                }
            });
        } else {

            if (err instanceof multer.MulterError) {
                res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading." });
            } else if (err) {
                res.json({ "kq": 0, "errMsg": "An unknown error occurred when uploading." + err });
            } else {
                var product = Product({
                    nameProduct: req.body.namePro,
                    cateProduct: req.body.catePro,
                    priceProduct: req.body.pricePro,
                    imgProduct: req.file.filename
                });
                product.save(function (err) {
                    if (err) {
                        req.flash('message', 'Thêm thất bại');
                        res.redirect('/admin/product')
                        return;
                    } else {
                        req.flash('message', 'Thêm thành Công');
                        res.redirect('/admin/product')
                        return;
                    }
                })
            }
        }
    });
};
module.exports.product = function (req, res) {
    Product.find(function (err, data) {
        if (err) {
            res.json({ "kq": 0, "errMsg": err });
        } else {
            User.findOne({ _id: req.cookies.loginid }, function (err, data1) {
                if (err) {
                    res.json({ "kq": 0, "errMsg": err });
                } else {
                    res.render("product/product", { listproduct: data, listdata: data1, errs: req.flash('message') });
                }
            })
        }
    })

};
module.exports.proEdit = function (req, res) {
    Category.find(function (err, pro) {
        if (err) {
            res.json({ "kq": 0, "errMsg": err });
        } else {
            Product.findById(req.params.id, function (err, data) {
                if (err) {
                    res.json({ "kq": 0, "errMsg": err });
                } else {
                    res.render('product/edit-pro', { Product: data, listcategory: pro, errs1: req.flash('message') })
                }
            })

        }
    })
}
module.exports.postProEdit = function (req, res) {
    upload(req, res, function (err) {
        if (!req.file) {
            Product.updateOne({ _id: req.body.idPro }, {
                nameProduct: req.body.namePro,
                cateProduct: req.body.catePro,
                priceProduct: req.body.pricePro,
            }, function (err) {
                if (err) {
                    req.flash('message', 'Chỉnh sửa thất bại');
                    res.redirect('/admin/product/edit/' + req.body.idPro)
                    return;
                } else {
                    req.flash('message', 'Chỉnh sửa thành Công');
                    res.redirect('/admin/product')
                    return;
                }
            });
        } else {
            if (err instanceof multer.MulterError) {
                res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading." });
            } else if (err) {
                res.json({ "kq": 0, "errMsg": "An unknown error occurred when uploading." + err });
            } else {
                Product.updateOne({ _id: req.body.idPro }, {
                    nameProduct: req.body.namePro,
                    cateProduct: req.body.catePro,
                    priceProduct: req.body.pricePro,
                    imgProduct: req.file.filename
                }, function (err) {
                    if (err) {
                        res.json({ "kq": 0, "errMsg": err });
                    } else {
                        res.redirect('/admin/product');
                    }
                });
            }
        }
    });
};
module.exports.proDelete = function (req, res) {
    Product.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.json({ "kq": 0, "errMsg": err });
        } else {
            req.flash('message', 'Xóa Thành công');
            res.redirect('/admin/product')
            return;
        }
    })
};