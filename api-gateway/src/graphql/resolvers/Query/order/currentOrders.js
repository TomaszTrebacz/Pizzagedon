import OrdersService from '#root/adapters/OrdersService';

const currentOrdersResolver = async (obj, { pageNumber, pageSize }) => {
	return await OrdersService.fetchAllCurrentOrders({ pageNumber, pageSize });
};

export default currentOrdersResolver;
