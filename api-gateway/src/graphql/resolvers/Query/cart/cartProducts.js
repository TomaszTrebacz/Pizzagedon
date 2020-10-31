import ProductsService from '#root/adapters/ProductsService';

const cartProductsResolver = async (obj, { userId }) => {
	return await ProductsService.fetchCartProducts({ userId });
};

export default cartProductsResolver;
