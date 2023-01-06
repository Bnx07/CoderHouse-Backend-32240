const fs = require('fs');

fs.writeFileSync
fs.readFileSync
fs.appendFileSync
fs.unlinkSync
fs.existsSync

function read(route, callback) {
    fs.readFile(route,(err, archiveData) => {
        console.log(archiveData)
        console.log(archiveData.toString())
    })
}

//read();

read(__dirname+'/archivoFs.txt');

function write(route, content, callback) {
    fs.writeFile(route, content, (archiveData) => {
        if (err) {
            console.log("Revisamos el error");
        } else {
            console.log(content);
        }
        console.log(archiveData)
        console.log(archiveData.toString())
    })
}

function deleteF(route, callback) {
    fs.unlink(__dirname+`/callback`)
}