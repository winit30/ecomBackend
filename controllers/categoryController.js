const Router = require("express").Router();

const {authenticate} = require('./../middleware/authenticate');
const {Category} = require("./../modals/categories");

Router.post("/createCategory", authenticate, (req, res) => {
    const body = req.body;
    var category = new Category(body);
    category.save().then((c) => {
        res.send(c);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

Router.get("/getCategories", (req, res) => {
    Category.find({}).then((categories) => {
        res.send(categories)
    }).catch(error => {
        res.status(500).send(error);
    })
});

Router.delete("/deleteAllCategories", authenticate, (req, res) => {
    Category.remove({}).then((r) => {
        console.log(r);
        res.send(r)
    });
});

module.exports = Router;
