const socket = io();

socket.on('products', data => {
    let productZone = document.getElementById('productsList');
    let products = '';
    data.forEach(product => {
        products = products + `<div class="product"><div style="display: grid; place-content: center;"><img src="${product.thumbnails}" alt="${product.title}" style="aspect-ratio: 1; width: 200px; object-fit: cover;"/></div><h2>Title: ${product.title}</h2><h2>Price: $${product.price}</h2><p>${product.description}</p></div>`
    })
    
    productZone.innerHTML = products;
})