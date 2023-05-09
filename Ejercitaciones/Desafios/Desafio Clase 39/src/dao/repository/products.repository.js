export default class Product {
    constructor(dao) {
        this.dao = dao;
    }

    async get() {
        return await this.dao.get();
    }

    async getSome(limit, page, query, sort) {
        return await this.dao.getSome(limit, page, query, sort);
    }

    async getOne(id) {
        return await this.dao.getOne(id);
    }
     async post(product) {
        return await this.dao.post(product);
     }

     async put(id, product) {
        return await this.dao.put(id, product);
     }

     async delete(id) {
        return await this.dao.delete(id)
     }
}