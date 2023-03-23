import { Router } from "express";
// import ContactsMongo from "../dao/mongo/contact.mongo.js";
// import ContactsMemory from "../dao/memory/contacts.memory.js";
import { Contacts } from "../dao/factory.js";
import ContactsDTO from "../dao/DTOs/contacts.dto.js";
import { contactsServices } from "../repository/index.js";

let router = Router();

// let contactsService = new Contacts();

// let contactsManagerMongo = new ContactsMongo();
// let contactsManagerMemory = new ContactsMemory();

// router.get('/?', async(req, res) => {
//     let {persistence = "mongo"} = req.query;
    
//     if (persistence.toLowerCase() == "mongo") {
//         return res.send({status: "Ok", payload: await contactsManagerMongo.get()});
//     } else if (persistence.toLowerCase() == "file") {
//         return res.send({status: "Ok", payload: await contactsManagerMemory.get()});
//     }
//     res.send({status: "error", message: "La persistencia indicada no existe"})
// })

// router.post('/?', async(req, res) => {
//     let {persistence = "mongo", firstName = "Patata", lastName = "Argento", email, age} = req.query;

//     age = parseInt(age);

//     if (persistence.toLowerCase() == "mongo") {
//         return res.send({status: "Ok", payload: await contactsManagerMongo.post({firstName, lastName, email, age})});
//     } else if (persistence.toLowerCase() == "file") {
//         return res.send({status: "Ok", payload: await contactsManagerMemory.post({firstName, lastName, email, age})});
//     }
//     res.send({status: "error", message: "La persistencia indicada no existe"})
// })

// router.put('/?', async(req, res) => {
//     let {persistence = "mongo", firstName = "Patata", lastName = "Argento", email, age=18} = req.query;

//     if (persistence.toLowerCase() == "mongo") {
//         return res.send({status: "Ok", payload: await contactsManagerMongo.put(email, {firstName, lastName, age})});
//     } else if (persistence.toLowerCase() == "file") {
//         return res.send({status: "Ok", payload: await contactsManagerMemory.put(email, {firstName, lastName, email, age})});
//     }
//     res.send({status: "error", message: "La persistencia indicada no existe"})
// })

// router.delete('/?', async(req, res) => {
//     let {persistence = "mongo", email} = req.query;

//     if (persistence.toLowerCase() == "mongo") {
//         return res.send({status: "Ok", payload: await contactsManagerMongo.delete(email)});
//     } else if (persistence.toLowerCase() == "file") {
//         return res.send({status: "Ok", payload: await contactsManagerMemory.delete(email)});
//     }
//     res.send({status: "error", message: "La persistencia indicada no existe"})
// })

router.get('/', async(req, res) => {
    let result = await contactsServices.get();
    res.send({status: "Ok", payload: result});
})

router.post('/', async(req, res) => {
    let {firstName, lastName, email} = req.body;
    let contact = new ContactsDTO({firstName, lastName, email});
    let result = await contactsServices.post(contact);
    res.send({status: "Ok", payload: result})
})

export default router;