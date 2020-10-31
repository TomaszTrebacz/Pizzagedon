import OrdersService from '#root/adapters/OrdersService';

const orderResolver = async (obj, { id }) => {
	return await OrdersService.fetchOrder({ id });
};

export default orderResolver;
