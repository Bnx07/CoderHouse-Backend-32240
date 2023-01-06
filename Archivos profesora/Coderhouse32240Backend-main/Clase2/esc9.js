let objeto1 ={
    propiedad1:2,
    propiedad2:"nombre",
    propiedad3:true
}
let objeto2 ={
    propiedad2:"apellido",
    propiedad3:[2,3,4,5,6]
}

let {propiedad1,propiedad2}=objeto1;
let objeto3={...objeto1,...objeto2}
console.log(objeto3);

let objeto4 ={
    a: 1,
    b: 2,
    c:3
}

let {a,...rest}=objeto4;
console.log(rest); // respuesta  b:2 c:3


