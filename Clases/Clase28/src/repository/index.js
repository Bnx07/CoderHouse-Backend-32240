import { Contacts } from "../dao/factory.js";
import contactsRepository from "./contacts.repository.js";

export const contactsServices = new contactsRepository(new Contacts());