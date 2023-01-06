let contador=() =>{
    let variable1=1;
    console.log("Ejecutar operación");
    let tiempo=setInterval(()=>{
        console.log(variable1++);
        if(variable1>5){
            clearInterval(tiempo);
        }
    },1000) // tenemos intervalos estos se ejecutan cada 1 seg
}

console.log("Paso 1");
contador();
console.log("Paso final!");
