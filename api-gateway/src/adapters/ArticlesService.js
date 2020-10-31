import got from 'got';

const ARTICLES_SERVICE_URI = 'http://articles-service:7103';

export default class ArticlesService {
	static async fetchArticle({ id }) {
		const response = await got.get(`${ARTICLES_SERVICE_URI}/articles/${id}`).json();
		return response;
	}

	static async fetchArticles({ pageNumber, pageSize }) {
		const response = await got
			.get(`${ARTICLES_SERVICE_URI}/articles/all/${pageNumber}/${pageSize}`)
			.json();
		return response;
	}

	static async countArticles() {
		const response = await got.get(`${ARTICLES_SERVICE_URI}/articles/all/count`).json();

		return response;
	}

	static async createArticle({ title, content }) {
		const response = await got
			.post(`${ARTICLES_SERVICE_URI}/articles`, { json: { title, content } })
			.json();
		return response;
	}

	static async updateArticle({ id, title, content }) {
		const response = await got
			.post(`${ARTICLES_SERVICE_URI}/articles/update`, { json: { id, title, content } })
			.json();
		return response;
	}

	static async deleteArticle({ id }) {
		const response = await got
			.delete(`${ARTICLES_SERVICE_URI}/articles/delete`, {
				json: { id },
			})
			.json();
		return response;
	}
}
