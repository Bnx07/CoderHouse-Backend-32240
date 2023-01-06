import express from 'express';
import path from 'path';
// const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send('<a href="/bienvenida" style="font-size:24px">Hola, anda a /bienvenida</a> <a href="/usuario" style="font-size:24px">o a /usuario<a>');
})

app.get("/bienvenida", (req, res) => {
    res.send('<h1 style="color:blue">Hola, bienvenido a mi servidor</h1>');
})

app.get("/usuario", (req, res) => {
    res.send({nombre: "Pepe", apellido: "Argento", edad: 40, correo: "pepeargento@gmail.com"});
})

app.get("/file", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/file.html"));
})

app.listen(8080, () => 
    console.log("Servicio arriba"));