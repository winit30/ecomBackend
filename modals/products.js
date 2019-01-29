const mongoose = require('mongoose');
const _ = require('lodash');

var ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        maxLength: 200
    },
    brand: {
        type: String,
        trim: true,
        maxLength: 200
    },
    price: {
        type: String,
        trim: true,
        maxLength: 15
    },
    category: {
        type: String,
        trim: true,
        maxLength: 100
    },
    subCategory: {
        type: String,
        trim: true,
        maxLength: 100
    },
    subSubCategory: {
        type: String,
        trim: true,
        maxLength: 100
    },
    discount: {
        type: String,
        trim: true,
        maxLength: 3
    },
    productDesc: {
        type: String,
        trim: true,
        maxLength: 100
    },
    productSummary: {
        type: String,
        trim: true,
        maxLength: 100
    },
    thumbnail: {
        type: String,
        trim: true,
        maxLength: 1000
    },
    status: {
        type: Boolean,
        default: false
    },
    coverImages: [
        {
            type: String,
            trim: true,
            minlength: 1,
            maxLength: 1000
        }
    ],
    sizeAvailable: {
        type: String,
        trim: true,
        maxLength: 100
    }

} , {usePushEach: true});

ProductSchema.methods.toJSON = function() {
  	var product = this;
  	var productObject = product.toObject();
  	return _.pick(productObject, ["_id", "productName", "brand", "category", "subCategory", "subSubCategory", "discount", "productDesc", "productSummary", "thumbnail", "coverImages", "sizeAvailable", "status", "price"]);
};

var Product = mongoose.model('Product', ProductSchema);

module.exports = {Product};
