const numero = {}

for(let i = 0 ; i < 10000; i++){
    let number = Math.floor(Math.random()*20+1);
    if(!numero[number]) numero[number] = 1;
    else numero[number]++;
}
console.log(numero);