import fs from 'fs';

export default class transactionManager {
    constructor() {
        console.log("transactionManager initialized");
        this.path = "../../";
        
        if (!fs.existsSync(`${this.path}transactions.json`)) {
            fs.writeFileSync(`${this.path}transactions.json`);
        }
    }

    getAll = async() => {

    }

    getOne = async(id) => {
        
    }

    createOne = async() => {
        
    }

    editOne = async() => {
        
    }
}