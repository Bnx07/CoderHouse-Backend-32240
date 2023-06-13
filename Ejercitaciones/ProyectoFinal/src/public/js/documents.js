const form = document.getElementById("postDocumentsForm");

const email = document.getElementById('userEmail').innerHTML;

form.addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(form);

    fetch(`/api/session/${email}/reviewDocuments`, {method: 'POST', body: data}).then(response => response.json()).then(json => {
        if (json.status == 'Ok') {
            fetch(`/api/session/${email}/documents`, {method: 'POST', body: data}).then(response => response.json()).then(json => {
                console.log(json)
                if (json.status == 'Ok') Swal.fire({icon: 'success', title: 'Archivos subidos correctamente'});
                else Swal.fire({icon: 'info', title: json.message});
            })
        } else {
            if (json.message == 'No se enviaron documentos') return Swal.fire({icon: 'error', title: 'No se enviaron documentos'})
            Swal.fire({icon: 'warning', title: 'Hay campos repetidos', text: json.message, showDenyButton: true, confirmButtonText: 'Save', denyButtonText: `Don't save`}).then((result) => {
                if (result.isConfirmed) {
                    fetch(`/api/session/${email}/documents`, {method: 'POST', body: data}).then(response => response.json()).then(json => {
                        console.log(json)
                        if (json.status == 'Ok') Swal.fire({icon: 'success', title: 'Archivos subidos correctamente'});
                        else Swal.fire({icon: 'info', title: json.message});
                    })
                } else if (result.isDenied) {
                  Swal.fire('Se ha cancelado la operacion', '', 'error')
                }
              })
        }
    })
})