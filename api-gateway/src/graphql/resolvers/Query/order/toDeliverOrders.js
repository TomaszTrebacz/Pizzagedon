import OrdersService from '#root/adapters/OrdersService';

const toDeliverOrdersResolver = async (obj, { pageNumber, pageSize }) => {
	return await OrdersService.fetchAllToDeliverOrders({ pageNumber, pageSize });
};

export default toDeliverOrdersResolver;
