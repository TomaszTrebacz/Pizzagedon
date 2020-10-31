import OrdersService from '#root/adapters/OrdersService';

const countFinishedUserOrdersResolver = async (ob, { userId }) => {
	return await OrdersService.countFinishedUserOrders({ userId });
};

export default countFinishedUserOrdersResolver;
