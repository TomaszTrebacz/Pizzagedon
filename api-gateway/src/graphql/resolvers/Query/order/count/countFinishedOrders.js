import OrdersService from '#root/adapters/OrdersService';

const countFinishedOrdersResolver = async () => {
	return await OrdersService.countFinishedOrders();
};

export default countFinishedOrdersResolver;
