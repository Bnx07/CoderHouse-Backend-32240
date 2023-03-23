export default class Contacts {
    constructor() {
        this.data = [];
    }

    get = () => {
        return this.data;
    }

    post = (contact) => {
        this.data.push(contact);
        return "Contacto agregado";
    }

    delete = async(email) => {
        let position = this.data.findIndex(element => element.email == email);
        if (position != 1) {
            return "NotFound"
        }
        this.data = this.data.splice(position, 1);
        return "Contacto eliminado";
    }

    put = async(email) => {
        return "No existo"
    }
}