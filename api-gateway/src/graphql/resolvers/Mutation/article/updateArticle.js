import ArticlesService from '#root/adapters/ArticlesService';

const updateArticleResolver = async (obj, { id, title, content }) => {
	return await ArticlesService.updateArticle({ id, title, content });
};

export default updateArticleResolver;
