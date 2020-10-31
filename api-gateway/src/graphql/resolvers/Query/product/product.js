import ProductsService from '#root/adapters/ProductsService';

const productResolver = async (obj, { productId }) => {
	return await ProductsService.fetchProduct({ productId });
};

export default productResolver;
