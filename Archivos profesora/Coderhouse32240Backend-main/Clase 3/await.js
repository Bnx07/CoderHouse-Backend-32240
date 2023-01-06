async function soyAsincrona(){
    console.log("mensaje Asincrono")
    setTimeout(function(){
        console.log('probando asincronia')
    },1000);
}

//await soyAsincrona();

async function main(){
    await soyAsincrona();
}
main();