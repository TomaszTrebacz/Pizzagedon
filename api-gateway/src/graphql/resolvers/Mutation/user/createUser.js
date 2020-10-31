import UsersService from "#root/adapters/UsersService";

const createUserResolver = async (obj,
    {
        email,
        password,
        role,
        name,
        surname,
        street,
        postCode,
        city,
        phoneNumber
    }) => {
    return await UsersService.createUser(
        {
            email,
            password,
            role,
            name,
            surname,
            street,
            postCode,
            city,
            phoneNumber
        });
};

export default createUserResolver;