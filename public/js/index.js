var XHR = new XMLHttpRequest(),
origin = window.location.origin
rootView = document.getElementById('root');

const getComponents = (url, cb) => {
    XHR.open('GET', url);
    XHR.send();
    XHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cb(XHR.responseText);
            }
    };
}

const setViews = (url, cb) => {
    XHR.open('GET', url);
    XHR.send();
    XHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cb(XHR.responseText);
            }
    };
}

const AppView = {
    init: () => {
        Views.render();
    },
    onLoad: () => {

    },
    render: () => {
        setViews("./views/pages/app.html", (html) => {
            if (html) {
              rootView.innerHTML = html;
              const appView = document.getElementById("appView");
              Views.renderComponents(appView);
            }
        })
    },
    renderComponents: (appView) => {
        getComponents("./views/components/sidebar.html", (html) => {
            appView.innerHTML+= html;
            getComponents("./views/components/sidebar.html", (html) => {
                appView.innerHTML+= "<div>loga</div>";
            });
        });
    }
}

AppView.init();
