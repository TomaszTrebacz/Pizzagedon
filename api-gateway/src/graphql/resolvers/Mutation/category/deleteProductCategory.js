import ProductsService from '#root/adapters/ProductsService';

const deleteProductCategoryResolver = async (obj, { categoryId, newCategoryId }) => {
	await ProductsService.deleteProductCategory({ categoryId, newCategoryId });

	return true;
};

export default deleteProductCategoryResolver;
