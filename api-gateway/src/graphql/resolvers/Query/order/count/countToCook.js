import OrdersService from '#root/adapters/OrdersService';

const countToCookResolver = async () => {
	return await OrdersService.countToCook();
};

export default countToCookResolver;
