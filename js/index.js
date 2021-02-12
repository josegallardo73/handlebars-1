"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Template_1 = require("./Template");
const Productos_1 = require("./Productos");
const PORT = '8080';
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const template = new Template_1.Template('hbs', 'index.hbs', 'hbs', '/views/layouts', 'views/partials', app);
template.generateEngine();
template.registerEngine('view engine', 'hbs');
template.registerViews('views', __dirname + '/views');
const consolas = new Productos_1.Productos();
app.use('/api', router);
app.use('/', express_1.default.static(__dirname + '/public'));
app.get('/api', (req, res) => {
    res.send('Punto inicial de la aplicación');
});
router.get('/productos', (req, res) => {
    let listExists = true;
    if (consolas.getProductos().length < 1)
        listExists = false;
    res.render('main', { listProducts: consolas.getProductos(), listExists });
});
router.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const producto = consolas.findProducto(parseInt(id));
    if (!producto)
        res.json({ error: 'Producto no encontrado' });
    else
        res.json(producto);
});
function validar(req, res, next) {
    if (req.body.title === ''
        || req.body.price === ''
        || req.body.thumbnail === '') {
        res.send('No se completaron todos los campos del formulario');
    }
    else {
        req.body.price = parseInt(req.body.price);
        next();
    }
}
app.post('/agregarproducto', validar, (req, res) => {
    const producto = req.body;
    consolas.setProductos(producto);
    res.writeHead(301, {
        Location: 'http://localhost:8080/index.html'
    });
    res.end();
});
router.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = consolas.findProducto(id);
    if (!producto)
        res.sendStatus(404);
    else {
        const productoUpdated = {
            id: id,
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        };
        consolas.updateProducto(productoUpdated);
        res.json({
            "title": req.body.title,
            "price": req.body.price,
            "thumbnail": req.body.thumbnail,
            "id": id
        });
    }
});
router.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    const producto = consolas.findProducto(parseInt(id));
    if (!producto)
        res.sendStatus(404);
    else {
        consolas.deleteProducto(parseInt(id));
        res.json({
            message: 'Producto eliminado',
            producto: producto
        });
    }
});
app.listen(PORT, () => console.log('Server listening in port ', PORT))
    .on("error", (err) => (`Se ha producido el siguiente error: ${err}`));
