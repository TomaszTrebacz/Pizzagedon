import ProductsService from '#root/adapters/ProductsService';

const productCategoryResolver = async (obj, { categoryId }) => {
	return await ProductsService.fetchProductCategory({ categoryId });
};

export default productCategoryResolver;
