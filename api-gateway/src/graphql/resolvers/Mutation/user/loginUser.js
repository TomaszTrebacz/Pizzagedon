import UsersService from "#root/adapters/UsersService"

const loginUserResolver = async (obj, { email, password }) => {
    const user = await UsersService.loginUser({ email, password })

    return user;
}

export default loginUserResolver