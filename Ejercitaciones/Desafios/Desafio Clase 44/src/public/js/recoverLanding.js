const form = document.getElementById('recoverForm');

form.addEventListener('submit', event => {
    event.preventDefault();

    let password = document.getElementById('passwordInput').value;
    let token = document.getElementById('token').innerHTML;

    let data = {
        token,
        password
    }

    fetch('/api/session/recoverPassword', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => result.json()).then(json => {
        console.log(json);
        if (json.status == "Ok") {
            Swal.fire({
                icon: 'success',
                title: 'Contraseña reestablecida correctamente'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: json.message
            })
        }
    });
});