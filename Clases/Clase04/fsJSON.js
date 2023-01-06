const fs = require('fs');
import { blob } from buffer;

const content = fs.readFile('./package.json');

// JSON.stringify(objetoAReemplazar, replacer, '\t');

// JSON.parse(object);

// const readFile = async() => {
//     let content = await fs.promises.readFile('./package.json', 'utf-8', (error, result) => {
//         if (error) throw new error;
//         console.log(result.stringify);
//     }
//     );
// }

// const readFile = async (nombre) => {
//     try {
//         let contenidoStr = await fs.promises.readFile(nombre, 'utf-8');
//         let contenidoObj = JSON.parse(contenidoStr);
//         let size = (await fs.promises.stat(nombre)).size; // stat devuelve los datos
//         const info = {
//             'contenidoStr': contenidoStr,
//             'contenidoObj': contenidoObj,
//             'size': size
//         }
//         return info;
//     } catch (e) {
//         throw new Error(e.message);
//     }
// }

// const resultado = async () => {
//     try {
//         readFile('./package.json')
//     } catch (e) {
//         throw new Error(e.message);
//     }
// }

// (async function main() { // ( antes hace que sea autoejecutable)
//     try {
//         await resultado()
//     } catch (e) {
//         console.log(e)
//     }
// })()

const enviroment = async() => {
    const file = await fs.promises.readFile('./package.json', 'utf-8');
    const contenidoStr = file;
    const contenidoObj = JSON.parse(file);
    // const fileSize = file.blob
    const info = {
        "contenidoStr": contenidoStr,
        "contenidoObj": contenidoObj,
        // "size": size
    }
}