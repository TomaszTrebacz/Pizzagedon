import OrdersService from '#root/adapters/OrdersService';

const toCookOrdersResolver = async (obj, { pageNumber, pageSize }) => {
	return await OrdersService.fetchAllToCookOrders({ pageNumber, pageSize });
};

export default toCookOrdersResolver;
