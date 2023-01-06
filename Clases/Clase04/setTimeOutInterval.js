// SET TIMEOUT

const temporizador = (callback) => {
    setTimeout(() => {
        callback();
    }, 5000);
}

let activity = () => console.log("Proceso");

console.log("Se inicia la actividad");
temporizador(activity);
console.log("Se espera el resultado");

// SET INTERVAL

let contador = () => {
    variable = 1;
    console.log("Ejecutando operacion");
    let tiempo = setInterval(() => {
        console.log(variable++);
        if (variable > 5) {
            clearInterval(tiempo);
        }
    }, 1000)
}

contador();