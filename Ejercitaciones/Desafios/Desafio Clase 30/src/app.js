import express from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { __dirname } from './utils.js'

const app = express();

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'benjabastan@gmail.com',
        pass: 'uodgaaewnbtwfhbm'
    }
})

const twilioAccountSid = 'ACdf6ce642e3e445af6731191fad63fa03';
const twilioToken = 'e638d8570e7aa31bfd38f5c94b5201e9';
const twilioSmsNumber = '+15856561832';

const client = twilio(twilioAccountSid, twilioToken);

app.get('/mail', async(req, res) => {
    await transport.sendMail({
        from: 'benjabastan@gmail.com',
        to: 'benjabastan@gmail.com',
        subject: 'Se ha creado una cuenta en Ecommerce Coder',
        html: `
        <div style="background-color: black; color: green; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h1>Bienvenido a Ecommerce Coder</h1>
            <img style="width: 60%" src="cid:welcomeMandala"/>
        </div>
        `,
        attachments: [{
            filename: 'welcome.jpg',
            path:__dirname+'/images/welcome.jpg',
            cid: 'welcomeMandala'
        }, {
            filename: 'contract.txt',
            path: __dirname+'/images/contract.txt',
            cid: 'contract'
        }] // Manda imagenes
    })
    res.send({status: "Ok", message: "Email enviado"});
})

app.get('/wpp', async(req, res) => {
    let result = await client.messages.create({
        body: "Haz click en este link y gana un iPhone XIX GRATIS https://guthib.com",
        from: twilioSmsNumber,
        to: "+542236908060"
    })

    res.send({status: "Ok", message: "Mensaje enviado"})
})

app.listen(8080, () => console.log("Working on port 8080"));