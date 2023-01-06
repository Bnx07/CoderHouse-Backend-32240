const fs = require('fs');

fs.promises
fs.promises.readFile // etc

const opAsync = async() => {
    await fs.promises.writeFile('./file.txt', "Arrancamos con promesas");

    let resultado = await fs.promises.readFile('./file.txt', 'utf-8');
    console.log(resultado);

    await fs.promises.appendFile('./file.txt', ' Extra content');

    resultado = await fs.promises.readFile('./file.txt', 'utf-8');
    console.log(resultado);

    await fs.promises.unlink('./file.txt');
}