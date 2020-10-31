import UsersService from '#root/adapters/UsersService';

const allUsersResolver = async (obj, { pageNumber, pageSize }) => {
	return await UsersService.fetchAllUsers({ pageNumber, pageSize });
};

export default allUsersResolver;
