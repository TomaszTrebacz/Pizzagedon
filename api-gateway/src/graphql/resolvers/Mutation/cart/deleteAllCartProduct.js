import ProductsService from '#root/adapters/ProductsService';

const deleteCartProductResolver = async (obj, { userId }) => {
	await ProductsService.deleteAllCartProduct({ userId });

	return true;
};

export default deleteCartProductResolver;
