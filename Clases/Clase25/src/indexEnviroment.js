import dotenv from 'dotenv';
import { Command } from "commander";

const program = new Command();

program
    .requiredOption('--mode <modo>', 'Ingrese el modo de la aplicacion', 'DEVELOP');
program.parse();

console.log('Opciones', program.opts());
console.log('Parametros', program.args);

dotenv.config({
    path: program.opts().mode === "DEVELOP" ? './.env.develop' : './.env.product'
})

console.log(program.opts())