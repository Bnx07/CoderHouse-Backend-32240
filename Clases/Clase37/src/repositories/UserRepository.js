export default class UserRepository {
    constructor() {
        this.dao = dao;
    }

    getUser() {
        return this.dao.getAll();
    }
}