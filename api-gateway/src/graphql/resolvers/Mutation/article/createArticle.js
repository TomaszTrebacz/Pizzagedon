import ArticlesService from '#root/adapters/ArticlesService';

const createArticleResolver = async (obj, { title, content }) => {
	return await ArticlesService.createArticle({ title, content });
};

export default createArticleResolver;
