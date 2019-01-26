const AppController = {
    init: () => {
        App.init();
    },
    onLoad: async () => {
        await App.renderComponents();
        ViewController.init();
    },
    onMenuClicked: (routeName) => {
        ViewController.changeView(routeName);
    }
};

const App = {
    init: () => {
        this.rootView = document.getElementById('root');
        App.render();
    },
    onLoad: () => {
        this.appView = document.getElementById("appView");
        AppController.onLoad();
    },
    renderComponents: async () => {
        const html = await getView("./views/components/sidebar.html");
        this.appView.innerHTML += html;
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
        const html = await getView("./views/pages/app.html");
        this.rootView.innerHTML = html;
        App.onLoad();
    }
}

const Views = {
    init: () => {
        this.appContentView = document.getElementById("appContentView");
    },
    renderView: async (viewName) => {
        const templateUrl = routes[viewName].template;
        const html = await getView(templateUrl);
        this.appContentView.innerHTML = html;
        routes[viewName].controller.init();
    }
}

const ViewController = {
    init: async () => {
        Views.renderView("AddCategories");
    },
    changeView: (viewName) => {
        Views.renderView(viewName);
    }
}
