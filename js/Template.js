"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const handlebars = require('express-handlebars');
class Template {
    constructor(engine, defaultLayout, extension, layoutsDir, partialsDir, app) {
        this.engine = engine;
        this.defaultLayout = defaultLayout;
        this.extension = extension;
        this.layoutsDir = layoutsDir;
        this.partialsDir = partialsDir;
        this.app = app;
    }
    generateEngine() {
        this.app.engine(this.engine, handlebars({
            extname: `.${this.extension}`,
            defaultLayout: this.defaultLayout,
            layoutsDir: __dirname + this.layoutsDir,
            partialsDir: __dirname + this.partialsDir,
        }));
    }
    registerEngine(name, engine) {
        this.app.set(name, engine);
    }
    registerViews(name, path) {
        this.app.set(name, path);
    }
}
exports.Template = Template;
