let cadena =`            cadena`;
console.log(cadena.trim());

let mensajes=[];
let intentoMensaje= `                 `; 
if (intentoMensaje.trim().length>0){
    mensajes.push(intentoMensaje.trim());
}else{
    console.log("mensaje vacio")
}