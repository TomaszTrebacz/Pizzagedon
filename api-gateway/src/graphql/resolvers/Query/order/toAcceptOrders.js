import OrdersService from '#root/adapters/OrdersService';

const toAcceptOrdersResolver = async (obj, { pageNumber, pageSize }) => {
	return await OrdersService.fetchAllToAcceptOrders({ pageNumber, pageSize });
};

export default toAcceptOrdersResolver;
