export default class ContactsDTO {
    constructor(){
        this.firstName = contact.firstName;
        this.lastName = contact.lastName;
        this.email = contact.email ?contact.email.split('-').join('') : "";
    }
}