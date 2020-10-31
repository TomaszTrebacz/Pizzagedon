import ArticlesService from '#root/adapters/ArticlesService';

const articlesResolver = async (obj, { pageNumber, pageSize }) => {
	return await ArticlesService.fetchArticles({ pageNumber, pageSize });
};

export default articlesResolver;
