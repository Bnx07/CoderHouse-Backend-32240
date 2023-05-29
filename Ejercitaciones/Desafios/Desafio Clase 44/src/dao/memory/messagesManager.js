import fs from 'fs';

export default class MessageManager {
    constructor(path) {
        this.path = path;
    }
    
    getAll = async() => { // Funciona
        if (fs.existsSync(`${this.path}messages.json`)) { // Si el archivo existe, se lee y añade el dato
            const objects = await JSON.parse(fs.readFileSync(`${this.path}messages.json`, "utf-8"));
            return objects;

        } else {
            return [];
        }
    }

    addMessage = async(message) => { // Funciona
        if (fs.existsSync(`${this.path}messages.json`)) { // Si el archivo existe, se lee y añade el dato
            let objects = await JSON.parse(fs.readFileSync(`${this.path}messages.json`, "utf-8"));
            let lastMessage = await objects.pop()
            objects.push(lastMessage);
            message.id = await lastProduct.id+1;
    
            objects.push(message);
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}messages.json`, objects);
            return 'Message added';
        } else { // Si no existe, se crea con el producto directamente
            message.id = 0;
            let objects = [message];
    
            objects = JSON.stringify(objects);
            fs.writeFileSync(`${this.path}messages.json`, objects);
            return 'Message added';
        }
    }

    clearAll = async() => {
        fs.unlinkSync(`${this.path}messages.json`);
        return "Deleted";
    }
}