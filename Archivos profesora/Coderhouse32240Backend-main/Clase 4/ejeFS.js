
const archivo= require('fs'); // require es una función que se puede usar para importar símbolos desde otro módulo al ámbito actual.

function leer(ruta,miCallback){
    archivo.readFile(ruta,(err, datosArchivo) =>{
        //console.log(datosArchivo); // datos no legibles un buffer
        console.log(datosArchivo.toString());
        //miCallback(datosArchivo.toString());
    })
}
//leer();
leer(__dirname+'/archivoFs.txt')
//leer(__dirname+'/archivoFs.txt',console.log)

function escribir(ruta,contenido,miCallback){
    archivo.writeFile(ruta,contenido,function(err){
        if(err){
            console.error("Controlamos el error");
        }else{
            console.log("Se escribio algo")
        }
       })
}
escribir(__dirname+'/archivoFsW.txt','Creamos un archivo nuevo', console.log);

// mi callback para obtener respuesta
function borrar(ruta,miCallback){
    archivo.unlink(ruta,miCallback);
}
borrar(__dirname+'/archivoFsW.txt', console.log);
