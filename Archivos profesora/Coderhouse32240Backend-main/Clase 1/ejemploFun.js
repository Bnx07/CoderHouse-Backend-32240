function mostrarLista(lista){
    
    let i; 

    for( i=0 ; i<=lista.length;i++)
    {
        if(lista== ""){
        console.log("La lista no esta vacia");
        }else{
            console.log(lista[i]+" Cantidad"+lista.length)
        }
    }
}

mostrarLista([1,2,3,4]);
