const fs= require('fs');

fs.writeFileSync('./archivo_pruebaFS.txt',"Hola coders, esto es un archivo creado con FS")

if(fs.existsSync('./archivo_pruebaFS.txt')){ // valida si el archivo existe arroja un true/false
    console.log("prueba de ingreso")
    let contenido=fs.readFileSync('./archivo_pruebaFS.txt','utf-8') // lee el contenido del archivo 
    // tipos de codificacion en este caso UTF 8
    console.log(contenido)

    fs.appendFileSync('./archivo_pruebaFS.txt','   --->Mas información')
    // busca el archivo sino lo encuentra lo crea 
    // sino agrega la informacion en la ultima parte 

    contenido=fs.readFileSync('./archivo_pruebaFS.txt','utf-8')
    console.log(contenido);
    fs.unlinkSync('./archivo_pruebaFS.txt'); // elimina el archivo ...
}