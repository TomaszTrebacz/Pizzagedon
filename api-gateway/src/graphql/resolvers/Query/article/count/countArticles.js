import ArticlesService from '#root/adapters/ArticlesService';

const countArticlesResolver = async () => {
	return await ArticlesService.countArticles();
};

export default countArticlesResolver;
