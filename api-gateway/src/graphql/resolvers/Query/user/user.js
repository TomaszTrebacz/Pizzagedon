import UsersService from '#root/adapters/UsersService';

const userResolver = async (obj, { userId }) => {
	return await UsersService.fetchUser({ userId });
};

export default userResolver;
