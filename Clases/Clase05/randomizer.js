const object = {}

for (var i = 0; i < 10000; i ++) {
    numero = Math.floor(Math.random() * 20 + 1) // Numero del 0 al 19 so +1
    if (numero in object) {
        object[numero] ++;
    } else {
        object[numero] = 1; // Creo key en object
    }
}

console.log(object);