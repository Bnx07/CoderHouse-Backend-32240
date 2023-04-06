const socket = io();
const chatBox = document.getElementById('chatBox'); // No es estrictamente necesario

let user = document.getElementById("user").innerHTML
socket.emit('authenticated', user);

chatBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            console.log("SEND")
            let message = {message: chatBox.value};
            fetch('/api/chat', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message)
            })
            chatBox.value = '';
        }
    }
})

function sendMessage() {
    if (chatBox.value.trim().length > 0) {
        fetch('/api/chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chatBox.value)
        })
        chatBox.value = '';
    }
}

socket.on('Messages', data => {
    if (!user) return;
    let log = document.getElementById('chatZone');
    let messages = '';
    data.forEach(message => {
        messages = messages + `<div class="message"><p class="user">${message.user}</p><p>${message.message}</p></div>`
    })
    log.innerHTML = messages;
})

socket.on('newUserConnected', data => {
    if(!user) return;
    Swal.fire({
        background: 'rgb(20,20,20)',
        color: 'rgb(180, 180, 180)',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: "success"
    })
})