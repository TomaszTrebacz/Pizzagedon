import { User } from '#root/db/models';
import generateUUID from '#root/helpers/generateUUID';
import hashPassword from '#root/helpers/hashPassword';
import passwordCompareSync from '#root/helpers/passwordCompareSync';

import { Op } from 'sequelize';
const setupRoutes = (app) => {
	app.get('/users/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.pageNumber || !req.params.pageSize) return next(new Error('Invalid body!'));

		try {
			let users = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			if (req.params.pageNumber === 1) {
				users = await User.findAll({
					where: {
						role: {
							[Op.ne]: 'root',
						},
					},
					limit: pageSize,
				});
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				users = await User.findAll({
					where: {
						role: {
							[Op.ne]: 'root',
						},
					},
					offset: offset,
					limit: pageSize,
				});
			}
			if (!users) return next(new Error('Cannot fetch data from database!'));

			return res.json(users);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/users/count', async (req, res, next) => {
		try {
			const total = await User.count({
				where: {
					role: {
						[Op.ne]: 'root',
					},
				},
			});

			if (!total) return next(new Error('Cannot fetch data from database!'));

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/user', async (req, res, next) => {
		if (
			!req.body.email ||
			!req.body.password ||
			!req.body.name ||
			!req.body.surname ||
			!req.body.street ||
			!req.body.postCode ||
			!req.body.city ||
			!req.body.phoneNumber
		) {
			return next(new Error('Invalid body!'));
		}

		try {
			const UUID_id = generateUUID();

			const newUser = await User.create({
				id: UUID_id,
				password: hashPassword(req.body.password),
				email: req.body.email,
				name: req.body.name,
				surname: req.body.surname,
				street: req.body.street,
				postCode: req.body.postCode,
				city: req.body.city,
				phoneNumber: req.body.phoneNumber,
			});

			if (!newUser) return next(new Error('Cannot fetch data from database!'));

			return res.json(newUser);
		} catch (e) {
			return next(e);
		}
	});
	app.get('/users/root', async (req, res, next) => {
		try {
			const user = await User.findOne({ where: { role: 'root' } });

			if (!user) return next(new Error('Cannot fetch data using from database!'));

			return res.json(user);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/users/:userId', async (req, res, next) => {
		if (!req.params.userId) return next(new Error('Invalid body!'));
		try {
			const user = await User.findByPk(req.params.userId);

			if (!user) return next(new Error('Cannot fetch data from database!'));

			return res.json(user);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/users', async (req, res, next) => {
		if (!req.body.email || !req.body.password) {
			return next(new Error('Invalid body!'));
		}

		try {
			const user = await User.findOne({ attributes: {}, where: { email: req.body.email } });

			if (!user) return next(new Error('Cannot post data to database!'));

			if (!passwordCompareSync(req.body.password, user.password)) {
				return next(new Error('Incorrect password!'));
			}

			return res.json(user);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/user/update', async (req, res, next) => {
		if (
			!req.body.id ||
			!req.body.name ||
			!req.body.surname ||
			!req.body.street ||
			!req.body.postCode ||
			!req.body.city ||
			!req.body.phoneNumber
		) {
			return next(new Error('Invalid body!'));
		}

		try {
			await User.update(
				{
					name: req.body.name,
					surname: req.body.surname,
					street: req.body.street,
					postCode: req.body.postCode,
					city: req.body.city,
					phoneNumber: req.body.phoneNumber,
				},
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

	app.post('/user/updateRole', async (req, res, next) => {
		if (!req.body.id || !req.body.role) {
			return next(new Error('Invalid body!'));
		}

		try {
			await User.update(
				{
					role: req.body.role,
				},
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
