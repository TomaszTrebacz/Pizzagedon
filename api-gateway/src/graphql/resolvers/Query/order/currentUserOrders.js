import OrdersService from '#root/adapters/OrdersService';

const currentUserOrdersResolver = async (obj, { userId, pageNumber, pageSize }) => {
	return await OrdersService.fetchCurrentUserOrders({ userId, pageNumber, pageSize });
};

export default currentUserOrdersResolver;
