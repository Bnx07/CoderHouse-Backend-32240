export default class Users {    
    constructor(dao) {
        this.dao = dao;
    }

    async post(user) {
        return await this.dao.post(user);
    }

    async getOne(search) {
        return await this.dao.getOne(search);
    }
}
