const Views = {
    AddCategories: {
        init: (ref) => {
          Views.AddCategories.render(ref);
        },
        renderComponents: () => {},
        render: async (ref) => {
            const html = await setViews("./views/pages/add-category.html");
            ref.innerHTML = html;
        }
    },
    AddSubCategories: {
        init: (ref) => {
          Views.AddSubCategories.render(ref);
        },
        renderComponents: () => {},
        render: async (ref) => {
            const html = await setViews("./views/pages/add-sub-category.html");
            ref.innerHTML = html;
        }
    },
    AddSubSubCategories: {
        init: (ref) => {
          Views.AddSubSubCategories.render(ref);
        },
        renderComponents: () => {},
        render: async (ref) => {
            const html = await setViews("./views/pages/add-sub-sub-category.html");
            ref.innerHTML = html;
        }
    },
    GetCategories: {
        init: (ref) => {
          Views.GetCategories.render(ref);
        },
        renderComponents: () => {},
        render: async (ref) => {
            const html = await setViews("./views/pages/get-categories.html");
            ref.innerHTML = html;
        }
    }
}
