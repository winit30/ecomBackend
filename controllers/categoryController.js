const Router = require("express").Router();

const {authenticate} = require('./../middleware/authenticate');
const {Category} = require("./../modals/categories");

Router.post("/createCategory", (req, res) => {
    const body = req.body;
    var category = new Category(body);
    category.save().then((c) => {
        res.send(c);
    }).catch((e) => {
        res.status(403).send(e);
    });
});

Router.put('/updateCategory/:_id', (req, res) => {
	Category.updateCategory(req.params._id, req.body).then((category) => {
		  res.send(category);
	}).catch((err) => {
		  res.send(err);
	});
});

Router.get("/getCategories", (req, res) => {
    Category.find({}).then((categories) => {
        res.send(categories)
    }).catch(error => {
        res.status(403).send(error);
    })
});

Router.delete("/deleteCategory/:_id", (req, res) => {
    Category.deleteOne({_id: req.params._id}).then((r) => {
        res.send(r)
    });
});

module.exports = Router;
