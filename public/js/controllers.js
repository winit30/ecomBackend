const AddCategoriesController = {
    init: () => {
        this.categoryName = getElementById("category-name");
        this.iconName = getElementById("icon-name");
        this.addCategory = getElementById("add-category");
        this.addCategory.addEventListener("click", AddCategoriesController.addCategoryReqest);
    },
    addCategoryReqest: async () => {
        const body = {
            categoryName: this.categoryName.value || "",
            categoryAlias: this.categoryName.value.toLowerCase() || "",
            iconName: this.iconName.value || ""
        }
        await fetchApi("/categories/createCategory", "POST", 200, body);
    }
}

const AddSubCategoriesController = {
    init: async () => {
        this.selectedCategory = getElementById("select-category");
        this.subCategoryName = getElementById("sub-category");
        this.addSubCategoryButton = getElementById("sub-category-button");
        this.addSubCategoryButton.addEventListener("click", AddSubCategoriesController.addSubCategoryReqest);
        this.allCategories = await CategoryModal.getAllCategories();
        console.log(this.allCategories);
        this.allCategories.forEach((item) => {
            this.selectedCategory.options[this.selectedCategory.options.length] = new Option(item.categoryName, item._id);
        });
    },
    addSubCategoryReqest: async () => {
        const category = this.allCategories.filter((cat) => cat._id === this.selectedCategory.value);
        if(category.length === 1 && this.subCategoryName.value) {
            const body = category[0];
            body.subCategories.push({
                subCategoryName: this.subCategoryName.value,
                subCategoryAlias: this.subCategoryName.value.toLowerCase(),
                subCategoriesTwo: []
            });
            await fetchApi("/categories/updateCategory/"+this.selectedCategory.value, "PUT", 200, body);
        }
    }
}

const AddSubSubCategoriesController = {
    init: async () => {
        this.selectedCategory = getElementById("select-category");
        this.selectedSubCategory = getElementById("select-sub-category");
        this.selectedSubCategory.options[this.selectedSubCategory.options.length] = new Option("Select Sub Category", "");
        this.selectedCategory.options[this.selectedCategory.options.length] = new Option("Select Category", "");
        this.addSubSubCategoryButton = getElementById("sub-sub-category-button");
        this.addSubSubCategoryButton.addEventListener("click", AddSubSubCategoriesController.addSubSubCategoryReqest);
        this.subSubCategoryName = getElementById("sub-sub-category");
        this.allCategories = await CategoryModal.getAllCategories();
        console.log(this.allCategories);
        this.selectedCategory.addEventListener("change", AddSubSubCategoriesController.refreshView);
        this.allCategories.forEach((item) => {
            this.selectedCategory.options[this.selectedCategory.options.length] = new Option(item.categoryName, item._id);
        });
    },
    addSubSubCategoryReqest: async () => {
        const category = this.allCategories.filter((cat) => cat._id === this.selectedCategory.value);
        if(category.length === 1 && this.subSubCategoryName.value) {
              category[0].subCategories.forEach((subCat) => {
                   if (subCat._id === this.selectedSubCategory.value) {
                        subCat.subCategoriesTwo.push({
                            subCategoryTwoName: this.subSubCategoryName.value,
                            subCategoryTwoAlias: this.subSubCategoryName.value.toLowerCase()
                        });
                   }
              });
              const body = category[0];
              await fetchApi("/categories/updateCategory/"+this.selectedCategory.value, "PUT", 200, body);
        }
    },
    refreshView: () => {
        for(var i = this.selectedSubCategory.options.length; i >= 0; i--) {
            this.selectedSubCategory.options[i] = null
        }
        const category = this.allCategories.filter((cat) => cat._id === this.selectedCategory.value);
        if (category.length === 1) {
            this.selectedSubCategory.options[this.selectedSubCategory.options.length] = new Option("Select Sub Category", "");
            category[0].subCategories.forEach((item) => {
                this.selectedSubCategory.options[this.selectedSubCategory.options.length] = new Option(item.subCategoryName, item._id);
            });
        }
    }
}

const GetCategoriesController = {
    init: () => {
        GetCategoriesController.getAllCategories();
    },
    getAllCategories: async () => {
        return await fetchApi("/categories/getCategories", "GET", 200);
    }
}

const CategoryModal = {
    init: () => {},
    getAllCategories: async () => {
        return await GetCategoriesController.getAllCategories()
    }
}
