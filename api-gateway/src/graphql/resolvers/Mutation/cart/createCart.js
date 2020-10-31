import ProductsService from "#root/adapters/ProductsService"

const createCartResolver = async (obj, { userId }) => {
    return await ProductsService.createCart({ userId })
}

export default createCartResolver