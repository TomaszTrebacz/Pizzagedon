import ProductsService from '#root/adapters/ProductsService';

const countProductsInCategoryResolver = async (obj, { categoryId }) => {
	return await ProductsService.countProductsInCategory({ categoryId });
};

export default countProductsInCategoryResolver;
