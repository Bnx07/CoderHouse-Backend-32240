const form = document.getElementById("recoverForm");

form.addEventListener('submit', event => {

    event.preventDefault();

    const data = new FormData(form);
    const object = {};

    data.forEach((value, key) => {
        object[key] = value;
    })
    
    fetch('/api/session/recover', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => result.json()).then(json => {
        console.log(json);
        if (json.status == "Ok") {
            Swal.fire({
                icon: 'success',
                title: 'Se ha enviado un mail',
                text: 'Abrelo para poder reestablecer tu contraseña'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops, the credentials arent valid',
                text: json.message || "Verify your email and password"
            })
        }
    });
})