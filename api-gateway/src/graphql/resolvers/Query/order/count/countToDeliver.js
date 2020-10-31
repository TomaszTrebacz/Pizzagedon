import OrdersService from '#root/adapters/OrdersService';

const countToDeliverResolver = async () => {
	return await OrdersService.countToDeliver();
};

export default countToDeliverResolver;
