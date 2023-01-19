const socket = io();
// const chatBox = document.getElementById('chatBox'); // No es estrictamente necesario
Swal.fire({
    title: 'Identify yourself',
    input: 'text',
    text: 'Input your name',
    inputValidator: (value) => {
        return !value && 'You need a username';
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', Swal.fire({
        text: `User ${user} has connected`,
        toast: true,
        position: 'top-right'
    }));
    socket.on('Messages', data => {
        let log = document.getElementById('messageLogs');
        let messages = '';
        data.forEach(message => {
            messages = messages + `${message.user} dice ${message.message} </br>`
        })
        log.innerHTML = messages;
    })
});

chatBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {user: user, message: chatBox.value});
            chatBox.value = '';
        }
    }
})

socket.on('Messages', data => {
    if (!user) return;
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages = messages + `${message.user} dice ${message.message} </br>`
    })
    log.innerHTML = messages;
})