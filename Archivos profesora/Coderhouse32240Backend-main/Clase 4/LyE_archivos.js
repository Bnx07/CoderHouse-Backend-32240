import fs from 'fs';
import { Blob } from 'buffer';

const environment = async() =>{
    const archvio = await fs.promises.readFile('./package.json','utf-8');
    const contenidoString = archvio;
    const contenidoObj = JSON.parse(archvio);
    const size = new Blob([archvio]).size;
    const informacion = {
        contenidoString,
        contenidoObj,
        size
    }
    console.log(informacion);
    await fs.promises.writeFile('./info.json',JSON.stringify(informacion,null,'\t'))
}
environment();