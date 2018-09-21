const Router = require("express").Router();
const fs = require("fs");
const multer  = require("multer");
const path = require("path");

const {authenticate} = require('./../middleware/authenticate');
const {Product} = require("./../modals/products");

const storage = multer.diskStorage({
    destination: './productAssets/uploads/',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null,true);
    } else {
        cb('Error: Image File Only!');
    }
}

const uploadThumbnail = multer({
    storage,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) =>  checkFileType(file, cb)
}).single("thumbnail");

const uploadCover = multer({
    storage,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) =>  checkFileType(file, cb)
}).array("coverImages", 3);

Router.post("/uploadProductThumbnail", authenticate, (req, res) => {
    uploadThumbnail(req, res, (error) => {
        if (error) {
            res.send(error);
        } else {
            if (req.file == undefined) {
                res.send('Error: No File Selected!');
            } else {
                res.send(req.file);
            }
        }
    });
});

Router.post("/uploadCoverImages", authenticate, (req, res) => {
    uploadCover(req, res, (error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            if (req.files == undefined) {
                res.status(500).send('Error: No File Selected!');
            } else {
                res.send(req.files);
            }
        }
    });
});

Router.post("/createProduct", authenticate, (req, res) => {
    const body = req.body;
    var product = new Product(body);
    product.save().then(p => {
        res.status(201).send(p);
    }).catch((e) => {
        console.log(e);
        res.status(500).send(e);
    });
});

Router.get("/getProducts", (req, res) => {
    Product.find({}).then((products) => {
        res.send(products)
    }).catch(error => {
        res.status(500).send(error);
    })
});

Router.get("/getProductDetails/:id", (req, res) => {
    Product.find({_id: req.params.id}).then((products) => {
        res.send(products[0])
    }).catch(error => {
        res.status(500).send(error);
    })
});

Router.delete("/deleteProduct/:id", authenticate, (req, res) => {
    Product.find({_id: req.params.id}).then(res => {
        const prodcut = res
        if(prodcut) {
            try {
                fs.unlinkSync(prodcut[0].thumbnail);
                prodcut[0].coverImages.forEach(image => {
                    fs.unlinkSync(image);
                });
                return Product.remove({"_id": req.params.id});
            } catch (e) {
                console.log(e);
            } finally {
                return Product.remove({"_id": req.params.id});
            }
        }
    }).then((r) => {
        console.log(r);
        res.send(r)
    }).catch(error => {
        res.status(500).send(error);
    });
});

Router.put("/updateProduct/:id", authenticate, (req, res) => {
    Product.update({"_id": req.params.id},  {$set:req.body}, {new: true}).then((r) => {
        res.send(r)
    }).catch(error => {
        res.status(500).send(error);
    });
});

module.exports = Router;
