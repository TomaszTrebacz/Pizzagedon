import { Article } from '#root/db/models';

const setupRoutes = (app) => {
	app.get('/articles/all/:pageNumber/:pageSize', async (req, res, next) => {
		if (!req.params.pageNumber || !req.params.pageSize) return next(new Error('Invalid body!'));

		try {
			let articles = [];

			const pageSize = parseInt(req.params.pageSize, 10);

			if (req.params.pageNumber === 1) {
				articles = await Article.findAll({ limit: pageSize });
			} else {
				const offset = pageSize * (req.params.pageNumber - 1);
				articles = await Article.findAll({ offset: offset, limit: pageSize });
			}

			if (!articles) return next(new Error('Cannot fetch data from database!'));

			return res.json(articles);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/articles/all/count', async (req, res, next) => {
		try {
			const total = await Article.count();

			if (!total) return next(new Error('Cannot fetch data from database!'));

			return res.json(total);
		} catch (e) {
			return next(e);
		}
	});

	app.get('/articles/:id', async (req, res, next) => {
		if (!req.params.id) return next(new Error('Invalid body!'));
		try {
			const articles = await Article.findOne({ where: { id: req.params.id } });

			if (!articles) return next(new Error('Cannot fetch data from database!'));

			return res.json(articles);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/articles', async (req, res, next) => {
		if (!req.body.title || !req.body.content) return next(new Error('Invalid body!'));

		try {
			const article = await Article.create({
				title: req.body.title,
				content: req.body.content,
			});

			if (!article) return next(new Error('Cannot post data to database!'));

			return res.json(article);
		} catch (e) {
			return next(e);
		}
	});

	app.post('/articles/update', async (req, res, next) => {
		if (!req.body.id || !req.body.title || !req.body.content) {
			return next(new Error('Invalid body!'));
		}

		try {
			await Article.update(
				{
					title: req.body.title,
					content: req.body.content,
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

	app.delete('/articles/delete', async (req, res, next) => {
		if (!req.body.id) return next(new Error('Invalid body!'));

		try {
			await Article.destroy({
				where: {
					id: req.body.id,
				},
			});

			return res.end();
		} catch (e) {
			return next(e);
		}
	});
};

export default setupRoutes;
