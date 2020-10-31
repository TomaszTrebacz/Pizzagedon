import ProductsService from '#root/adapters/ProductsService';

const createProductCategoryResolver = async (obj, { name, iconName }) => {
	return await ProductsService.createProductCategory({ name, iconName });
};

export default createProductCategoryResolver;
