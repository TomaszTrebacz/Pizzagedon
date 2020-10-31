import ProductsService from "#root/adapters/ProductsService";


const productsCategoriesResolver = async () => {
    return await ProductsService.fetchAllProductsCategories();
};

export default productsCategoriesResolver;