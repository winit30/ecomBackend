const AppController = {
    init: () => {
        AppView.init();
    },
    onLoad: async () => {
        const appView = document.getElementById("appView");
        await AppView.renderComponents(appView);
        const appContentView = document.getElementById("appContentView");
        await Views.AddCategories.init(appContentView);
    },
    onMenuClicked: (routeName) => {
        const appContentView = document.getElementById("appContentView");
        Views[routeName].init(appContentView);
    }
};

const AppView = {
    init: () => {
        AppView.render();
    },
    onLoad: () => {
        AppController.onLoad();
    },
    renderComponents: async (ref) => {
        const html = await setViews("./views/components/sidebar.html");
        ref.innerHTML += html;
        const sidebar = document.querySelector(".sidebar-container ul");
        const getList = sidebar.getElementsByTagName("li");
        for(let i = 0; i < getList.length; i++) {
            getList[i].addEventListener("click", ((routeName) => {
                return () => {
                  AppController.onMenuClicked(routeName)
                }
            })(getList[i].getAttributeNode("data").value), false)
        }
        return html;
    },
    render: async () => {
        const html = await setViews("./views/pages/app.html");
        rootView.innerHTML = html;
        AppView.onLoad();
    }
}

AppController.init();
