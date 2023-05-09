const closeSession = async() => {
    let response = await fetch('/api/session/logout', {
        method: 'POST',
        body: "",
        headers: {
            "Content-Type": "application/json"
        }
    })

    console.log(response);

    if (response.status != 200) {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong'
        })
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Logged out succesfully'
    })

    setTimeout(function() {
        location.replace('/login');
    }, 900);
}

const swapRole = async() => {
    const email = document.getElementById("email").innerHTML;
    fetch(`/api/session/premium/${email}`, {method: 'post', headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(json => {
        if (json.status == "Ok") {
            Swal.fire({
                icon: 'success',
                title: json.message
            })
            setTimeout(function() {location.replace('/user');}, 900);
        } else {
            Swal.fire({
                icon: 'error',
                title: json.message
            })
        }
    })
}