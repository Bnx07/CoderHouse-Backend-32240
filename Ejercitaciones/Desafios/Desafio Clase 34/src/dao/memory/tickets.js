import fs from 'fs';

export default class Ticket {
    constructor(path) {
        this.path = path;
    }

    get = async() => {
        if (fs.existsSync(`${this.path}tickets.json`)) { // Si el archivo existe, se lee y añade el dato
            let objects = await JSON.parse(fs.readFileSync(`${this.path}tickets.json`, "utf-8"));
            return objects;
        } else { // Si no existe, se crea con el producto directamente
            return [];
        }
    }

    getOne = async(id) => {
        if (fs.existsSync(`${this.path}tickets.json`)) { // Si el archivo existe, se lee y añade el dato
            let objects = await JSON.parse(fs.readFileSync(`${this.path}tickets.json`, "utf-8"));
            let ticket = objects.find(element => element.id == id);
            return ticket
        } else { // Si no existe, se crea con el producto directamente
            return [];
        }
    }

    post = async ticket => {
        if (fs.existsSync(`${this.path}tickets.json`)) { // Si el archivo existe, se lee y añade el dato
            let objects = await JSON.parse(fs.readFileSync(`${this.path}tickets.json`, "utf-8"));
            let lastTicket = await objects.pop()
            objects.push(lastTicket);
            ticket.id = await lastProduct.id+1;
    
            objects.push(ticket);
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}tickets.json`, objects);
            return 'Ticket added';
        } else { // Si no existe, se crea con el producto directamente
            ticket.id = 0;
            let objects = [ticket];
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}tickets.json`, objects);
            return 'Ticket added';
        }
    }

    delete = async(id) => {
        if (fs.existsSync(`${this.path}tickets.json`)) {
            let objects = await JSON.parse(fs.readFileSync(`${this.path}tickets.json`));

            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);

            if (position === -1) {
                return 'Ticket not found';
            } else {
                objects.splice(position, 1);
                if (objects.length == 0) {
                    fs.unlinkSync(`${this.path}tickets.json`, objects);
                } else {
                    objects = JSON.stringify(objects);
                    fs.writeFileSync(`${this.path}tickets.json`, objects);
                }
                return 'Ticket has been deleted'
            }
        } else {
            return false;
        }
    }
}