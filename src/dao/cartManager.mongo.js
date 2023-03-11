const cartModel = require('./models/cart.model');
const producModel = require('./models/product.model');

class CartManager {
	addCart = async () => {
		try {
			await cartModel.create({});
		} catch (error) {
			console.log(error);
		}
	};
	getProdsByCartId = async id => {
		try {
			const cart = await cartModel.findById(id);
			return cart.products;
		} catch (error) {
			console.log(error);
		}
	};
	addProdToCart = async (cid, pid) => {
		try {
			const prod = await producModel.findById(pid);
			const cart = await cartModel.findById(cid);
			cart.products.push(prod);
			cart.save();
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = CartManager;
