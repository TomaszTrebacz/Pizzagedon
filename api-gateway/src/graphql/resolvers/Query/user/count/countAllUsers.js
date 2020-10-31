import UsersService from '#root/adapters/UsersService';

const countAllUsersResolver = async () => {
	return await UsersService.countAllUsers();
};

export default countAllUsersResolver;
