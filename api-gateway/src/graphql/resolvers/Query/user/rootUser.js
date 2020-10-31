import UsersService from "#root/adapters/UsersService";

const rootUserResolver = async () => {
    return await UsersService.fetchRootUser();
};

export default rootUserResolver;