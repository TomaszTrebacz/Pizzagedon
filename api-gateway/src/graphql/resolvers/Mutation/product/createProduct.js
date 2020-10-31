import ProductsService from '#root/adapters/ProductsService';

const createProductResolver = async (obj, { categoryId, name, description, price, imageUrl }) => {
	return await ProductsService.createProduct({ categoryId, name, description, price, imageUrl });
};

export default createProductResolver;
