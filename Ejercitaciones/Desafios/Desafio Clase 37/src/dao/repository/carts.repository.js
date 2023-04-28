export default class Carts {
    constructor(dao) {
      this.dao = dao;
    }
    async get() {
      return await this.dao.get();
    }
  
    async getOne(id) {
      return await this.dao.getOne(id);
    }
  
    async post() {
      return await this.dao.post();
    }
  
    async postPurchase(cid, pid) {
      return await this.dao.postPurchase(cid, pid);
    }
  
    async put(cid, products) {
      return await this.dao.put(cid, products);
    }
  
    async putProduct(cid, pid, quantity) {
      return await this.dao.putProduct(cid, pid, quantity);
    }
  
    async delete(cid, pid) {
      return await this.dao.delete(cid, pid);
    }
  
    async deleteProduct(cid) {
      return await this.dao.deleteProducts(cid);
    }
  }