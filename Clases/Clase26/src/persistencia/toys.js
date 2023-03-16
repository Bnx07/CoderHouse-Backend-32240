const toys = []

function create(obj) {
    toys.push(obj);
}

function read() {
    return toys;
}

export {
    create,
    read
}