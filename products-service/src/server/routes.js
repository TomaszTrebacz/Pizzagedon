import { Product, productCategory, Cart, CartProduct } from '#root/db/models';
import generateUUID from '#root/helpers/generateUUID';

import sequelize from '#root/db/connection';
import { QueryTypes } from 'sequelize';
const setupRoutes = (app) => {
	app.get('/product/:productId', async (req, res, next) => {
		if (!req.params.productId) return next(new Error('Invalid body!'));

		try {
			const product = await Product.findByPk(req.params.productId);

			if (!product) return next(new Error('Cannot fetch data from database!'));

			return res.json(product);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/productsInCategory/:categoryId/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.categoryId || !req.params.pageNumber || !req.params.pageSize)
			return next(new Error('Invalid body!'));

		try {
			let products = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			if (req.params.pageNumber === 1) {
				products = await Product.findAll({
					where: {
						categoryId: req.params.categoryId,
					},
					limit: pageSize,
				});
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				products = await Product.findAll({
					where: {
						categoryId: req.params.categoryId,
					},
					offset: offset,
					limit: pageSize,
				});
			}

			if (!products) return next(new Error('Cannot fetch data from database!'));

			return res.json(products);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/productsInCategory/count/:categoryId', async (req, res, next) => {
		if (!req.params.categoryId) return next(new Error('Invalid body'));

		try {
			const total = await Product.count({
				where: {
					categoryId: req.params.categoryId,
				},
			});
			if (!total) return next(new Error('Cannot fetch data from database!'));

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/productsCategories/:categoryId', async (req, res, next) => {
		if (!req.params.categoryId) return next(new Error('Invalid body'));

		try {
			const category = await productCategory.findByPk(req.params.categoryId);

			if (!category) return next(new Error('Cannot fetch data from database!'));

			return res.json(category);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/productsCategories', async (req, res, next) => {
		try {
			const productsCategories = await productCategory.findAll();

			if (!productsCategories) return next(new Error('Cannot fetch data from database!'));

			return res.json(productsCategories);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/products/count', async (req, res, next) => {
		try {
			const total = await Product.count();

			if (!total) return next(new Error('Cannot fetch data from database!'));

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/products/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.pageNumber || !req.params.pageSize) return next(new Error('Invalid body!'));

		try {
			let products = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			if (req.params.pageNumber === 1) {
				products = await Product.findAll({ limit: pageSize });
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				products = await Product.findAll({ offset: offset, limit: pageSize });
			}

			if (!products) return next(new Error('Cannot fetch data from database!'));

			return res.json(products);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/carts/:userId', async (req, res, next) => {
		if (!req.params.userId) return next(new Error('Invalid body!'));

		try {
			const cart = await Cart.findOne({
				where: {
					userId: req.params.userId,
				},
			});

			if (!cart) return next(new Error('Cannot fetch cart data from database!'));

			const cartProducts = await CartProduct.findAll({
				where: {
					cartId: cart.id,
				},
				include: [{ model: Product }],
			});

			if (!cartProducts) return next(new Error('Cannot fetch cartProducts data from database!'));

			return res.json(cartProducts);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/cartProducts/:userId', async (req, res, next) => {
		try {
			if (!req.params.userId) return next(new Error('Invalid body!'));

			const cartProducts = await sequelize.query(
				'SELECT * FROM products JOIN cartsProducts cP ON products.id = cP.productId JOIN carts c ON cP.cartId = c.id WHERE c.userId = :USERID',
				{
					replacements: { USERID: req.params.userId },
					type: QueryTypes.SELECT,
				}
			);

			if (!cartProducts) return next(new Error('Cannot fetch data from database!'));

			return res.json(cartProducts);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/products', async (req, res, next) => {
		if (
			!req.body.categoryId ||
			!req.body.name ||
			!req.body.description ||
			!req.body.price ||
			!req.body.imageUrl
		) {
			return next(new Error('Invalid body!'));
		}

		try {
			const product = await Product.create({
				categoryId: req.body.categoryId,
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				imageUrl: req.body.imageUrl,
			});

			if (!product) return next(new Error('Cannot post data to database!'));

			return res.json(product);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/productsCategories', async (req, res, next) => {
		if (!req.body.name || !req.body.iconName) {
			return next(new Error('Invalid body!'));
		}

		try {
			const category = await productCategory.create({
				name: req.body.name,
				iconName: req.body.iconName,
			});

			if (!category) return next(new Error('Cannot post data to database!'));

			return res.json(category);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/carts', async (req, res, next) => {
		if (!req.body.userId) {
			return next(new Error('Invalid body!'));
		}

		try {
			const newCart = await Cart.create({
				id: generateUUID(),
				userId: req.body.userId,
			});

			if (!newCart) return next(new Error('Cannot post data to database!'));

			return res.json(newCart);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/cartsProducts', async (req, res, next) => {
		if (!req.body.userId || !req.body.productId) {
			return next(new Error('Invalid body!'));
		}

		try {
			const cart = await Cart.findOne({
				where: {
					userId: req.body.userId,
				},
			});

			if (!cart) return next(new Error('Cannot fetch cart data from database!'));

			let productExist = await CartProduct.findOne({
				where: {
					productId: req.body.productId,
					cartId: cart.id,
				},
			});

			if (productExist) {
				let updatedQuantity = productExist.quantity;
				updatedQuantity++;

				await CartProduct.update(
					{ quantity: updatedQuantity },
					{
						where: {
							cartId: cart.id,
							productId: req.body.productId,
						},
					}
				);

				return res.json(productExist);
			} else {
				const newCartProduct = await CartProduct.create({
					cartId: cart.id,
					productId: req.body.productId,
					quantity: 1,
				});

				return res.json(newCartProduct);
			}
		} catch (e) {
			return next(e);
		}
	});

	app.delete('/cartsProducts/deleteAll', async (req, res, next) => {
		if (!req.body.userId) {
			return next(new Error('Invalid body!'));
		}

		try {
			const cart = await Cart.findOne({
				where: {
					userId: req.body.userId,
				},
			});

			await CartProduct.destroy({
				where: {
					cartId: cart.id,
				},
			});

			return res.end();
		} catch (e) {
			return next(e);
		}
	});

	app.delete('/cartsProducts/delete', async (req, res, next) => {
		if (!req.body.cartId || !req.body.productId) {
			return next(new Error('Invalid body!'));
		}

		try {
			await CartProduct.destroy({
				where: {
					cartId: req.body.cartId,
					productId: req.body.productId,
				},
			});

			return res.end();
		} catch (e) {
			return next(e);
		}
	});

	app.delete('/products/delete', async (req, res, next) => {
		if (!req.body.id) {
			return next(new Error('Invalid body!'));
		}

		try {
			await CartProduct.destroy({
				where: {
					productId: req.body.id,
				},
			});

			await Product.destroy({
				where: {
					id: req.body.id,
				},
			});

			return res.end();
		} catch (e) {
			return next(e);
		}
	});

	app.delete('/productsInCategory/delete', async (req, res, next) => {
		if (!req.body.categoryId || !req.body.newCategoryId) {
			return next(new Error('Invalid body!'));
		}

		try {
			await Product.update(
				{ categoryId: req.body.newCategoryId },
				{
					where: {
						categoryId: req.body.categoryId,
					},
				}
			);

			await productCategory.destroy({
				where: {
					id: req.body.categoryId,
				},
			});

			return res.end();
		} catch (e) {
			return next(e);
		}
	});
};

export default setupRoutes;
