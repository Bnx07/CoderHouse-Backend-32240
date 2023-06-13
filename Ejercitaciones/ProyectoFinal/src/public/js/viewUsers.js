const deleteUser = async(id) => {
    await fetch(`/api/session/${id}`, {method: "DELETE"}).then(result => result.json()).then(json => {
        let icon = 'error';
        if (json.status == "Ok") icon = "success";
        Swal.fire({icon, title: json.message});
    })
}

const swapRole = async(id) => {
    await fetch(`/api/session/swapRoleForced/${id}`, {method: "PUT"}).then(result => result.json()).then(json => {
        let icon = 'error';
        if (json.status == "Ok") icon = "success";
        Swal.fire({icon, title: json.message});
    })
}
