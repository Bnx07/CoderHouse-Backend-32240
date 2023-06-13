export default class Dto {
    getCurrent(user) {
        let dtoUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            full_name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role
        }
        return dtoUser;
    }

    getDetailed(user) {
        let dtoUser = {
            full_name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role,
            cart: user.cart[0],
            id: user._id
        }
        return dtoUser;
    }
}