import OrdersService from '#root/adapters/OrdersService';

const countToAcceptResolver = async () => {
	return await OrdersService.countToAccept();
};

export default countToAcceptResolver;
