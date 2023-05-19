/**
 * js-vfs polyfills
 * This file requires data.js to work!
 */

/**
 * The main class for js-vfs 
 */
class InjectPatches extends EventTarget {

    /**
     * Create a new patch instance
     * @param {JSZip | Promise<JSZip>} zip 
     */
    constructor(zip) {
        super();
        this._fetch = window.fetch;
        this._XMLHttpRequest = window.XMLHttpRequest;
        if(zip instanceof Promise) {
            zip.then(zip => {
                this.zip = zip;
                this.dispatchEvent(new Event("ready"));
                this.apply();
            });
        } else {
            this.zip = zip;
            this.dispatchEvent(new Event("ready"));
        }
    }
    /**
     * @param {String} path 
     * @returns {String}
     */
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
    /**
     * Apply the patches
     * @returns {this} this for chaining
     */
    apply() {
        window.fetch = (path, options) => this.fetch(path, options);
        window.XMLHttpRequest = this.XHRPollyfill;
        return this;
    }
    /**
     * Remove the patches
     * @returns {this} this for chaining
     */
    undo() {
        window.fetch = this._fetch;
        window.XMLHttpRequest = this._XMLHttpRequest;
        return this;
    }
}