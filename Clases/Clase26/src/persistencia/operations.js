const operations = []

function save(obj) {
    operations.push(obj);
}

function list() {
    return operations;
}

export {
    save,
    list
}