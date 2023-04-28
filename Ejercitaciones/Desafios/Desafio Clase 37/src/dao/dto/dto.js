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
}