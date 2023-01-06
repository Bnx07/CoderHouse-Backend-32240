const fs = require('fs');

function addDate() {
    let now = new Date();
    now = now.toLocaleDateString();
    return now
}

function addTime() {
    let now = new Date();
    now = now.toLocaleTimeString();
    return now
}

fs.writeFileSync('./file.txt', `Fecha: ${addDate()} -- Hora: ${addTime()}`, (error) => {
    if (error) return console.log(error);
    fs.readFile('./file.txt', 'utf-8', (error, result) => {
        if (error) return console.log("error");
        console.log(result);
    })
})