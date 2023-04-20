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