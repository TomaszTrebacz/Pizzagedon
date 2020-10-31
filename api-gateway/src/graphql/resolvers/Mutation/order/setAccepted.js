import OrdersService from "#root/adapters/OrdersService"

const setAcceptedResolver = async (obj, { id }) => {
    return await OrdersService.setAccepted({ id })
}

export default setAcceptedResolver
