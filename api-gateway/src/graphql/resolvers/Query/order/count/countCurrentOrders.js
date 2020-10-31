import OrdersService from '#root/adapters/OrdersService';

const countCurrentOrdersResolver = async () => {
	return await OrdersService.countCurrentOrders();
};

export default countCurrentOrdersResolver;
