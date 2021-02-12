const handlebars = require('express-handlebars');

export class Template {
    engine:string;
    defaultLayout:string;
    extension:string;
    layoutsDir:string;
    partialsDir:string;
    app:any;

    constructor(engine:string, defaultLayout:string, extension:string, layoutsDir:string, partialsDir:string, app:any) {
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
    registerEngine(name:string, engine:string) {
        this.app.set(name, engine);
    }
    registerViews(name:string, path:string) {
        this.app.set(name, path);
    }
}