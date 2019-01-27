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
        this.table = getElementById("category-table").getElementsByTagName("tbody")[0];
        this.deleteLink = document.createElement("button");
        const deleteText = document.createTextNode("Delete");
        this.editLink = document.createElement("button");
        const editText = document.createTextNode("Edit");
        this.editLink.appendChild(editText);
        this.deleteLink.appendChild(deleteText);
        GetCategoriesController.renderAllCategories();
    },
    renderAllCategories: async () => {
        GetCategoriesController.refreshView();
        const allCategories = await CategoryModal.getAllCategories();
        allCategories.forEach((cat) => {
            const newRow = this.table.insertRow(this.table.rows.length);
            // Insert a cells
            const cellOne  = newRow.insertCell(0);
            const cellTwo  = newRow.insertCell(1);
            const cellThree = newRow.insertCell(2);
            // Append a text node to the cells
            const textOne  = document.createTextNode(cat._id);
            const textTwo  = document.createTextNode(cat.categoryName);
            cellOne.appendChild(textOne);
            cellTwo.appendChild(textTwo);
            cellThree.appendChild(deleteLink);
            const deleteButton = this.deleteLink;
            deleteButton.id = cat._id;
            cellThree.innerHTML = deleteButton.outerHTML;
            const getDeleteButton = getElementById(cat._id);
            getDeleteButton.onclick = ((catId) => {
              return () => {
                   GetCategoriesController.deleteCategory(catId);
              };
            })(cat._id);
        });
    },
    refreshView: () => {
        const rows = this.table.getElementsByTagName("tr");
        if (rows.length > 0) {
          for(let i = rows.length - 1; i >= 0; i--) {
              this.table.deleteRow(i);
          }
        }
    },
    deleteCategory: async (catId) => {
        await CategoryModal.deleteCategory(catId);
        await GetCategoriesController.renderAllCategories();
    }
}

const CategoryModal = {
    init: () => {},
    getAllCategories: async () => {
        return await fetchApi("/categories/getCategories", "GET", 200);
    },
    deleteCategory: async (catId) => {
        return await fetchApi("/categories/deleteCategory/"+catId, "DELETE", 200);
    }
}
