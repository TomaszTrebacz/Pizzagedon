import ArticlesService from '#root/adapters/ArticlesService';

const articleResolver = async (obj, { id }) => {
	return await ArticlesService.fetchArticle({ id });
};

export default articleResolver;
