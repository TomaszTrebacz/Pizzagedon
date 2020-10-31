import OrdersService from '#root/adapters/OrdersService';

const finishedUserOrdersResolver = async (obj, { userId, pageNumber, pageSize }) => {
	return await OrdersService.fetchFinishedUserOrders({ userId, pageNumber, pageSize });
};

export default finishedUserOrdersResolver;
