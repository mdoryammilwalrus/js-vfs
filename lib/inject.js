/**
 * js-vfs polyfills
 * This file requires data.js to work!
 */

class InjectPolyfills {
    constructor(zip) {
        this._fetch = window.fetch;
        this._XMLHttpRequest = window.XMLHttpRequest;
        this.zip = zip;
    }
    formatPath(path) {
        if(path.endsWith("/")) path = path.slice(0, path.length - 1);
        if(path.startsWith("./")) path = path.slice(2);
        if(path.startsWith("/")) path = path.slice(1);
        return path;
    }
    async fetch(path, options) {
        const file = this.zip.file(this.formatPath(path));
        if(!file) return new Response("404 Not Found", {
            status: 404
        });
        return new Response(await file.async("arraybuffer"), {
            status: 200
        });
    }
    get XHRPollyfill() {
        const _this = this;
        class XMLHttpRequestPollyfill extends EventTarget {
            constructor() {
                super();
            }
            open(method, url) {
                this.url = _this.formatPath(url);
            }
            get responseText() {
                return this.response?.toString();
            }
            set onload(listener) {
                this.addEventListener("load", listener);
            }
            set onerror(listener) {
                this.addEventListener("error", listener);
            }
            setRequestHeader(header, value) {
            }
            getAllResponseHeaders() {
                return ""
            }
            send(data) {
                if(!_this.zip.file(this.url)) {
                    this.status = 404;
                    this.dispatchEvent(new Event("error"));
                    return;
                }
                const file = _this.zip.file(this.url);
                file.async(this.responseType || "text").then(data => {
                    this.response = data;
                    this.status = 200;
                    this.dispatchEvent(new Event("load"));
                });
            }
            isPollyfill = true
        }
        return XMLHttpRequestPollyfill;
    }
    apply() {
        window.fetch = (path, options) => this.fetch(path, options);
        window.XMLHttpRequest = this.XHRPollyfill;
        return this;
    }
    undo() {
        window.fetch = this._fetch;
        window.XMLHttpRequest = this._XMLHttpRequest;
        return this;
    }
}