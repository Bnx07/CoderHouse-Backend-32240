const fs=require('fs');
const operacionesAsincronas =async() => {
    await fs.promises.writeFile('./archivoFS.txt','Hola arrancamos con promesas')

    let resultado =await fs.promises.readFile('./archivoFS.txt','utf-8')
    console.log(resultado);

    await fs.promises.appendFile('./archivoFS.txt','---->contenido adicional')

    resultado= await fs.promises.readFile('./archivoFS.txt','utf-8');
    console.log(resultado);
    await fs.promises.unlink('./archivoFs.txt');
}

operacionesAsincronas();