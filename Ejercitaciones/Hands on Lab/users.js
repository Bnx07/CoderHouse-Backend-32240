const fs = require('fs');

class Users {
    constructor () {
        id = 0
    }

    createUser() {
        //buscar file
        if (fs.existsSync('./users.json')) {
            fs.writeFile
        } else {
            fs.appendFile
        }
    }
}