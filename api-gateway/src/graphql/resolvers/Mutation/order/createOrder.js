import OrdersService from "#root/adapters/OrdersService"

const createOrderResolver = async (obj, { userId, content, total, phoneNumber, street, postCode, city }) => {
    return await OrdersService.createOrder({ userId, content, total, phoneNumber, street, postCode, city })
}

export default createOrderResolver