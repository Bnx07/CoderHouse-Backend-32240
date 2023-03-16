const users = []

function create(obj) {
    users.push(obj);
}

function read() {
    return users;
}

export {
    create,
    read
}