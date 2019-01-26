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
        const response = await fetchApi("/categories/createCategory", "POST", 200, body);
    }
}

const AddSubCategoriesController = {
    init: () => {}
}

const AddSubSubCategoriesController = {
    init: () => {}
}

const GetCategoriesController = {
    init: () => {
        GetCategoriesController.getAllCategories();
    },
    getAllCategories: async () => {
        const response = await fetchApi("/categories/getCategories", "GET", 200);
        console.log(response);
    }
}
