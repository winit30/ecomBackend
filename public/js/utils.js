const XHR = new XMLHttpRequest();

const getView = (url) => {
    return new Promise((resolve, reject) => {
        XHR.open('GET', url);
        XHR.send();
        XHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(XHR.responseText);
            } else if (this.readyState == 4 && this.status !== 200) {
              reject();
            }
        };
    });
}

const getElementById = (id) => {
    return document.getElementById(id);
}
