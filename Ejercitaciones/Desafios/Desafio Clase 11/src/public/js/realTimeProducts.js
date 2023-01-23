const socket = io();

socket.on('products', data => {
    let productZone = document.getElementById('productsList');
    let products = '';
    data.forEach(product => {
        products = products + `title: ${product.title} ,
        description: ${product.description} ,
        code: ${product.code} ,
        price: ${product.price} ,
        stock: ${product.stock} ,
        category: ${product.category} ,
        thumbnail: ${product.thumbnail} ,
        id: ${product.id}</br>`
    })
    productZone.innerHTML = products;
})

chatBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            console.log('Papa');
            // fetch('/api/products/')
            // .then(res => res.json())
            // .then(data => {});
            socket.emit('products', {id: 0, title: chatBox.value}); // Lo lee, hacer que esto lo hagan los metodos del pm/cm
            chatBox.value = '';
        }
    }
})