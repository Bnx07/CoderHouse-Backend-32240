const form = document.getElementById("buyProducts");

const cid = document.getElementById('cid').innerHTML;

form.addEventListener('submit', event => {
    event.preventDefault();

    fetch(`/api/tickets/${cid}`, {method: 'POST', body: ''}).then(response => response.json()).then(json => {
        if (json.status == 'Ok') {
            Swal.fire({icon: 'success', title: json.message, text: json.payload});
        } else {
            Swal.fire({icon: 'error', title: json.message});
        }
    })
})