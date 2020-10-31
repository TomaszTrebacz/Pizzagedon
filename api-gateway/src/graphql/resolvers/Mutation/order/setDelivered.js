import OrdersService from "#root/adapters/OrdersService"

const setDeliveredResolver = async (obj, { id }) => {
    return await OrdersService.setDelivered({ id })
}

export default setDeliveredResolver
