import OrdersService from '#root/adapters/OrdersService';

const countCurrentUserOrdersResolver = async (obj, { userId }) => {
	return await OrdersService.countCurrentUserOrders({ userId });
};

export default countCurrentUserOrdersResolver;
