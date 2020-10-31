import ProductsService from "#root/adapters/ProductsService"

const addProductCartResolver = async (obj, { userId, productId }) => {
    return await ProductsService.addProductCart({ userId, productId })
}

export default addProductCartResolver
