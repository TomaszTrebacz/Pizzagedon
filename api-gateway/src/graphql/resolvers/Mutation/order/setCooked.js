import OrdersService from "#root/adapters/OrdersService"

const setCookedResolver = async (obj, { id }) => {
    return await OrdersService.setCooked({ id })
}

export default setCookedResolver
