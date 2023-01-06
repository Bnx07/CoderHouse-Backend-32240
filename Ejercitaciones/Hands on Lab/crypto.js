const crypto = require('crypto');
const fs = require('fs');

let mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
let mykey2 = crypto.createDecipher('aes-128-cbc', 'mypassword');

class UserManager {
    constructor() {
        
    }

    createUser = async(name, lastname, username, password) => {
        let objects = await JSON.parse(fs.readFileSync("./crypto.json", "utf-8"));

        let createdPassword = mykey.update(password, 'utf-8', 'hex');
        createdPassword += mykey.final('hex')

        let notCreatedUser = true;

        const dataBase = await JSON.parse(fs.readFileSync("./crypto.json", "utf-8"));

        dataBase.forEach(element => {
            if (element.username == username) {
                notCreatedUser = false;
            }
        })

        if (notCreatedUser) {
            const newUser = {
                name: name,
                lastname: lastname,
                username: username,
                password: createdPassword
            }
    
            objects.push(newUser);
    
            fs.writeFileSync("./crypto.json", JSON.stringify(objects));
        } else {
            console.log("El usuario ya existe")
        }

        console.log(objects)
    }

    validateUser = async(username, password) => {
        const objects = await JSON.parse(fs.readFileSync("./crypto.json", "utf-8"));

        objects.forEach(element => {
            let decryptedPassword = mykey2.update(element.password, 'hex', 'utf8');
            decryptedPassword += mykey2.final('utf-8');

            console.log(decryptedPassword.length);
            if (element.username == username && decryptedPassword == password) {
                console.log("Usuario válido");
            }
        });

    }
}

const um = new UserManager();
um.createUser("Pepe", "Argento", "Pepe08", "VamosRacing");

um.validateUser("Pepe08", "VamosRacing");

