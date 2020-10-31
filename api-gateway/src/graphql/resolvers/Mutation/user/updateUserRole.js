import UsersService from "#root/adapters/UsersService";

const updateUserRoleResolver = async (obj,
    {
        id,
        role
    }) => {
    return await UsersService.updateUserRole(
        {
            id,
            role
        });
};

export default updateUserRoleResolver;