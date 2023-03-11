const router = require('express').Router();
const CartManager = require('../dao/cartManager.mongo');

const cartManager = new CartManager();

router.post('/', async (req, res) => {
	await cartManager.addCart();
	res.status(200).json({ message: 'Cart added successfully' });
});

router.get('/:cid', async (req, res) => {
	const products = await cartManager.getProdsByCartId(req.params.cid);
	res.status(200).render('cart', { products });
});

router.post('/:cid/product/:pid', async (req, res) => {
	await cartManager.addProdToCart(req.params.cid, req.params.pid);
	res.status(200).json({ message: 'Product added successfully' });
});

module.exports = router;
