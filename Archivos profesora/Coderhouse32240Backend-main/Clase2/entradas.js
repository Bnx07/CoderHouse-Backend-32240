let obtenervalor=Object.entries(calculo);
console.log(obtenervalor);

let obtenerClave=Object.keys(calculo);
console.log(obtenerClave);

let obetnerSoloValores= Object.values(calculo);
console.log(obetnerSoloValores);

let valorTotal=obetnerSoloValores.reduce((validarInicio,validarAcumulado)=>valorAcumulado);
console.log(valorTotal);

