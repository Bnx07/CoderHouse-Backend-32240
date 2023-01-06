const http = require('http');

const server = http.createServer((request, response) => {
    response.end("Mi primer servidor");
});

server.listen(8080, () => {
    console.log("Puerto activado 8080");
})