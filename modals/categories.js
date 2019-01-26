const mongoose = require('mongoose');
const _ = require('lodash');

var CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        trim: true,
        minlength: 1,
        maxLength: 100,
        index: true,
        unique: true
    },
    categoryAlias: {
        type: String,
        trim: true,
        minlength: 1,
        maxLength: 100,
        unique: true
    },
    iconName: {
        type: String,
        trim: true,
        minlength: 1,
        maxLength: 100
    },
    subCategories: [
        {
            subCategoryName: {
                type: String,
                trim: true,
                minlength: 1,
                maxLength: 100
            },
            subCategoryAlias: {
                type: String,
                trim: true,
                minlength: 1,
                maxLength: 100
            },
            subCategoriesTwo: [
                {
                    subCategoryTwoName: {
                        type: String,
                        trim: true,
                        minlength: 1,
                        maxLength: 100
                    },
                    subCategoryTwoAlias: {
                        type: String,
                        trim: true,
                        minlength: 1,
                        maxLength: 100
                    }
                }
            ]
        }
    ]
} , {usePushEach: true});

CategorySchema.methods.toJSON = function() {
  	var category = this;
  	var categoryObject = category.toObject();
  	return _.pick(categoryObject, ['_id' ,'categoryName', 'categoryAlias', 'iconName', 'subCategories']);
};

CategorySchema.statics.updateCategory = function(_id, body) {
  const Category = this;
  return Category.update({_id}, {$set:body}, {new: true});
}

var Category = mongoose.model('Category', CategorySchema);

module.exports = {Category};
