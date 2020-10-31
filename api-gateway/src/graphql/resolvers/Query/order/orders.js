import OrdersService from "#root/adapters/OrdersService";


const ordersResolver = async () => {
    return await OrdersService.fetchAllOrders();
};

export default ordersResolver;