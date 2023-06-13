const form = document.getElementById("createProduct");

form.addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(form);

    const object = {};

    data.forEach((value, key) => {
        object[key] = value;
    })

    fetch(`/api/products/fullProduct`, {
        method: 'POST', 
        body: data, 
    }).then(response => response.json()).then(json => {
        if (json.status == 'Ok') {
            Swal.fire({icon: 'success', title: 'Se ha creado el producto'});
        } else {
            Swal.fire({icon: 'error', title: json.error});
        }
    })
})