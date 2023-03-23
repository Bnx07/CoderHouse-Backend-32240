import ContactsDTO from "../dao/DTOs/contacts.dto.js";
export default class contactsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    get = async() => {
        let result = await this.dao.get(); 
        return result;
    }

    post = async(contact) => {
        let contactToInsert = new ContactsDTO(contact);
        let result = await this.dao.post(contactToInsert);
        return result;
    }
}