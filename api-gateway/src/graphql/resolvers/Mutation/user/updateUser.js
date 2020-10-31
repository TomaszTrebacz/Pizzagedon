import UsersService from "#root/adapters/UsersService";

const updateUserResolver = async (obj,
    {
        id,
        name,
        surname,
        street,
        postCode,
        city,
        phoneNumber
    }) => {
    return await UsersService.updateUser(
        {
            id,
            name,
            surname,
            street,
            postCode,
            city,
            phoneNumber
        });
};

export default updateUserResolver;