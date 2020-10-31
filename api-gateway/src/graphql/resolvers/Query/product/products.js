import ProductsService from '#root/adapters/ProductsService';

const productsResolver = async (obj, { pageNumber, pageSize }) => {
	return await ProductsService.fetchAllProducts({ pageNumber, pageSize });
};

export default productsResolver;
