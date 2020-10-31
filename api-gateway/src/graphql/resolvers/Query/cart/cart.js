import ProductsService from '#root/adapters/ProductsService';

const cartResolver = async (obj, { userId }) => {
	return await ProductsService.fetchCart({ userId });
};

export default cartResolver;
