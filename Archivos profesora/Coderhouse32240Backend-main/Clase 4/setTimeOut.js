// Sincrono
/*
console.log("Paso 1");
console.log("Paso 2");
console.log("Paso 3");
console.log("Paso 4");
console.log("Fin...");

// setTimeout
*/
 
const temporizador =(miCallback)=>{
    setTimeout(()=>{
        miCallback();
    },5000)
}

let actividad=()=>console.log("Ejecutando operación");
console.log("Paso 1 ... ponemos en ejecución");
// Se ejecuta la función 5 seg 
temporizador(actividad);
console.log("vemos como se ejecuta la ultima parte");
