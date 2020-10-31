import { Order } from '#root/db/models';
import generateUUID from '#root/helpers/generateUUID';
import { Op } from 'sequelize';

const setupRoutes = (app) => {
	app.get('/orders', async (req, res, next) => {
		try {
			const orders = await Order.findAll();

			return res.json(orders);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/current/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.pageNumber || !req.params.pageSize)
			return next(new Error('pageNumber is null'));

		let orders = [];

		const pageSize = parseInt(req.params.pageSize, 10);

		// status => column `Delivered` is the last step of order
		try {
			if (req.params.pageNumber === 1) {
				orders = await Order.findAll({
					where: {
						Delivered: 0,
					},
					limit: pageSize,
				});
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				orders = await Order.findAll({
					where: {
						Delivered: 0,
					},
					offset: offset,
					limit: pageSize,
				});
			}

			if (!orders) return next(new Error('Cannot fetch data using sequelize'));

			return res.json(orders);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/current/count', async (req, res, next) => {
		try {
			const total = await Order.count({
				where: {
					Delivered: 0,
				},
			});

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/toDeliver/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.pageNumber || !req.params.pageSize)
			return next(new Error('categoryId is null'));

		try {
			let orders = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			if (req.params.pageNumber === 1) {
				orders = await Order.findAll({
					where: {
						Cooked: {
							[Op.eq]: 1,
						},
						Delivered: {
							[Op.ne]: 1,
						},
					},
					limit: pageSize,
				});
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				orders = await Order.findAll({
					where: {
						Cooked: {
							[Op.eq]: 1,
						},
						Delivered: {
							[Op.ne]: 1,
						},
					},
					offset: offset,
					limit: pageSize,
				});
			}

			if (!orders) return next(new Error('Cannot fetch data using sequelize'));

			return res.json(orders);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/toDeliver/count', async (req, res, next) => {
		try {
			const total = await Order.count({
				where: {
					Cooked: {
						[Op.eq]: 1,
					},
					Delivered: {
						[Op.ne]: 1,
					},
				},
			});

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/toCook/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.pageNumber || !req.params.pageSize)
			return next(new Error('categoryId is null'));

		try {
			let orders = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			if (req.params.pageNumber === 1) {
				orders = await Order.findAll({
					where: {
						Accepted: {
							[Op.eq]: 1,
						},
						Cooked: {
							[Op.ne]: 1,
						},
					},
					limit: pageSize,
				});
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				orders = await Order.findAll({
					where: {
						Accepted: {
							[Op.eq]: 1,
						},
						Cooked: {
							[Op.ne]: 1,
						},
					},
					offset: offset,
					limit: pageSize,
				});
			}

			if (!orders) return next(new Error('Cannot fetch data using sequelize'));

			return res.json(orders);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/toCook/count', async (req, res, next) => {
		try {
			const total = await Order.count({
				where: {
					Accepted: {
						[Op.eq]: 1,
					},
					Cooked: {
						[Op.ne]: 1,
					},
				},
			});

			if (!total) return next(new Error('Cannot fetch data from database!'));

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/toAccept/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.pageNumber || !req.params.pageSize)
			return next(new Error('categoryId is null'));

		try {
			let orders = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			if (req.params.pageNumber === 1) {
				orders = await Order.findAll({
					where: {
						Accepted: {
							[Op.ne]: 1,
						},
					},
					limit: pageSize,
				});
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				orders = await Order.findAll({
					where: {
						Accepted: {
							[Op.ne]: 1,
						},
					},
					offset: offset,
					limit: pageSize,
				});
			}

			if (!orders) return next(new Error('Cannot fetch data using sequelize'));

			return res.json(orders);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/toAccept/count', async (req, res, next) => {
		try {
			const total = await Order.count({
				where: {
					Accepted: {
						[Op.ne]: 1,
					},
				},
			});

			if (!total) return next(new Error('Cannot fetch data using sequelize'));

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/finished/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.pageNumber || !req.params.pageSize) return next(new Error('Invalid body!'));

		try {
			let orders = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			// status => column `Delivered` is the last step of order
			if (req.params.pageNumber === 1) {
				orders = await Order.findAll({
					where: {
						Delivered: 1,
					},
					limit: pageSize,
				});
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				orders = await Order.findAll({
					where: {
						Delivered: 1,
					},
					offset: offset,
					limit: pageSize,
				});
			}
			if (!orders) return next(new Error('Cannot fetch data using sequelize'));

			return res.json(orders);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/finished/count', async (req, res, next) => {
		try {
			const total = await Order.count({
				where: {
					Delivered: 1,
				},
			});

			if (!total) return next(new Error('Cannot fetch data from database!'));

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/:id', async (req, res, next) => {
		if (!req.params.id) return next(new Error('Invalid body!'));

		try {
			const order = await Order.findOne({
				where: {
					id: req.params.id,
				},
			});

			if (!order) return next(new Error('Cannot fetch data from database!'));

			return res.json(order);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/current/:userId/:pageNumber/:pageSize', async (req, res, next) => {
		// status => column `Delivered` is the last step of order
		if (!req.params.userId || !req.params.pageNumber || !req.params.pageSize)
			return next(new Error('Invalid body!'));

		try {
			let orders = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			if (req.params.pageNumber === 1) {
				orders = await Order.findAll({
					where: {
						userId: req.params.userId,
						Delivered: 0,
					},
					limit: pageSize,
				});
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				orders = await Order.findAll({
					where: {
						userId: req.params.userId,
						Delivered: 0,
					},
					offset: offset,
					limit: pageSize,
				});
			}

			if (!orders) return next(new Error('Invalid userId'));

			return res.json(orders);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/count/current/:userId', async (req, res, next) => {
		if (!req.params.userId) return next(new Error('Invalid body!'));

		try {
			const total = await Order.count({
				where: {
					userId: req.params.userId,
					Delivered: 0,
				},
			});

			if (!total) return next(new Error('Cannot fetch data from database!'));

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/finished/:userId/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.userId || !req.params.pageNumber || !req.params.pageSize)
			return next(new Error('Invalid body!'));

		// status => column `Delivered` is the last step of order
		try {
			let orders = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			if (req.params.pageNumber === 1) {
				orders = await Order.findAll({
					where: {
						userId: req.params.userId,
						Delivered: 1,
					},
					limit: pageSize,
				});
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				orders = await Order.findAll({
					where: {
						userId: req.params.userId,
						Delivered: 1,
					},
					offset: offset,
					limit: pageSize,
				});
			}

			if (!orders) return next(new Error('Invalid userId'));

			return res.json(orders);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/orders/count/finished/:userId', async (req, res, next) => {
		if (!req.params.userId) return next(new Error('Invalid body!'));

		try {
			const total = await Order.count({
				where: {
					userId: req.params.userId,
					Delivered: 1,
				},
			});

			if (!total) return next(new Error('Cannot fetch data from database!'));

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/orders', async (req, res, next) => {
		if (
			!req.body.userId ||
			!req.body.content ||
			!req.body.total ||
			!req.body.phoneNumber ||
			!req.body.street ||
			!req.body.postCode ||
			!req.body.city
		) {
			return next(new Error('Invalid body!'));
		}

		try {
			const newOrder = await Order.create({
				id: generateUUID(),
				userId: req.body.userId,
				content: req.body.content,
				total: req.body.total,
				phoneNumber: req.body.phoneNumber,
				street: req.body.street,
				postCode: req.body.postCode,
				city: req.body.city,
			});

			if (!newOrder) return next(new Error('Cannot post data to database!'));

			return res.json(newOrder);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/orders/setAccepted', async (req, res, next) => {
		if (!req.body.id) return next(new Error('Invalid body!'));

		try {
			await Order.update(
				{ Accepted: 1 },
				{
					where: {
						id: req.body.id,
					},
				}
			);

			return res.json(true);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/orders/setCooked', async (req, res, next) => {
		if (!req.body.id) {
			return next(new Error('Invalid order ID!'));
		}

		try {
			await Order.update(
				{ Cooked: 1 },
				{
					where: {
						id: req.body.id,
					},
				}
			);

			return res.json(true);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/orders/setDelivered', async (req, res, next) => {
		if (!req.body.id) return next(new Error('Invalid body!'));

		try {
			await Order.update(
				{ Delivered: 1 },
				{
					where: {
						id: req.body.id,
					},
				}
			);

			return res.json(true);
		} catch (e) {
			return next(e);
		}
	});
};

export default setupRoutes;
