export default class Dto {
    getCurrent(user) {
        returnUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            full_name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }
        return returnUser;
    }
}