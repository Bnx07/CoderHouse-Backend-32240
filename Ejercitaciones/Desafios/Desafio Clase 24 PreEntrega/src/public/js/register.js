const form = document.getElementById("registerForm");

form.addEventListener('submit', event => {

    event.preventDefault();

    const data = new FormData(form);
    const object = {};

    data.forEach((value, key) => {
        object[key] = value;
    })
    
    fetch('/api/session/register', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => {
        let response = result;
        console.log(response)
        if (response.redirected) {
            location.replace('/login')
        }
    })
    // .then(result => result.json()).then(json => console.log(json));
})