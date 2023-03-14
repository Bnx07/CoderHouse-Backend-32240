import { Command } from "commander";

const program = new Command();

program
    .option('-d', 'Valor debug', false)
    .option('-p <port', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Ambiente de trabajo', 'production')
    .requiredOption('-u <user>', 'Usuario utilizando la aplicacion', 'No se ha ingresado')
    .option('-l,--letters [letters...]', 'Especificar letras')
program.parse();

console.log('Opciones', program.opts());
console.log('Parametros', program.args);

