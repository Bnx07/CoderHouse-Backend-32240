const form = document.getElementById("loginForm");

form.addEventListener('submit', event => {

    event.preventDefault();

    const data = new FormData(form);
    const object = {};

    data.forEach((value, key) => {
        object[key] = value;
    })

    if (object.email == "" || object.password == "") {
        Swal.fire({
            icon: 'error',
            title: 'Fill all inputs'
        })
    } else {
        fetch('/api/session/login', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json()).then(json => {
            if (json.status == 'Ok') {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in'
                })
                setTimeout(function() {location.replace('/');}, 900);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops, the credentials arent valid',
                    text: json.error || "Verify your email and password"
                })
            }
        })
    }
})