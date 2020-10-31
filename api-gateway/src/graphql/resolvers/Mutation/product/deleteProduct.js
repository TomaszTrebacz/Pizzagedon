import ProductsService from '#root/adapters/ProductsService';

const deleteProductResolver = async (obj, { id }) => {
	await ProductsService.deleteProduct({ id });

	return true;
};

export default deleteProductResolver;
