import config from '../config/config.js';
import mongoose from 'mongoose';

export let Contacts;

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect('mongodb+srv://Benjamin:Bastan@codercluster.iwgklyq.mongodb.net/?retryWrites=true&w=majority');
        const {default: ContactsMongo} = await import ('./mongo/contact.mongo.js');
        Contacts = ContactsMongo;
        break;
    case "MEMORY":
        const {default: ContactsMemory} = await import ('./memory/contacts.memory.js');
        Contacts = ContactsMemory;
        break;
}