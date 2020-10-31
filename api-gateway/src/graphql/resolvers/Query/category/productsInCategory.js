import ProductsService from '#root/adapters/ProductsService';

const productsInCategoryResolver = async (obj, { categoryId, pageNumber, pageSize }) => {
	return await ProductsService.fetchProductsInCategory({ categoryId, pageNumber, pageSize });
};

export default productsInCategoryResolver;
