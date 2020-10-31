import OrdersService from '#root/adapters/OrdersService';

const finishedOrdersResolver = async (obj, { pageNumber, pageSize }) => {
	return await OrdersService.fetchAllFinishedOrders({ pageNumber, pageSize });
};

export default finishedOrdersResolver;
