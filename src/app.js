const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const path = require('path');
const routerProducts = require('./routes/products.router');
const routerCarts = require('./routes/carts.router');
const routerMessages = require('./routes/chat.router');
const { Server } = require('socket.io');
const productModel = require('./dao/models/product.model');
const displayRoutes = require("express-routemap");
require('dotenv').config();

const { DB_USER, DB_PASS } = process.env;

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`), () => displayRoutes(app));
const socketServer = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/messages', routerMessages);

app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));

socketServer.on('connection', async socket => {
	console.log('Nuevo cliente conectado');

	const products = await productModel.find({});
	socket.emit('products', products);

	socket.on('addProd', async prod => await productManager.addProduct(prod));

	socket.on('delProd', async id => await productManager.deleteProduct(id));
});



mongoose.connect(
	`mongodb+srv://${DB_USER}:${DB_PASS}@ecommerce.2ubhiqd.mongodb.net/?retryWrites=true&w=majority`
);
