import ArticlesService from '#root/adapters/ArticlesService';

const deleteArticleResolver = async (obj, { id }) => {
	await ArticlesService.deleteArticle({ id });

	return true;
};

export default deleteArticleResolver;
