import ProductsService from '#root/adapters/ProductsService';

const deleteCartProductResolver = async (obj, { cartId, productId }) => {
	await ProductsService.deleteCartProduct({ cartId, productId });

	return true;
};

export default deleteCartProductResolver;
