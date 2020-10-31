import ProductsService from "#root/adapters/ProductsService";


const countProductsResolver = async () => {
    return await ProductsService.countProducts();
};

export default countProductsResolver;