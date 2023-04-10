import { messages as MessageManager } from '../dao/factory.js';
import { io } from "../app.js";

const mm = new MessageManager();

export default class Messages {
    get = async(req, res) => {
        let user = req.user.user;
        console.log(user);
        let result = mm.getAll();
        res.send({status: 'Ok', payload: result});
    }

    post = async(req, res) => {
        let user = req.user.user;
        let {message} = req.body;
        message = JSON.parse(`${message}`);
        message = `${message}`;
        console.log(message);
        
        let fullMessage = {
            user: user.email,
            message
        }
        let result = await mm.addMessage(fullMessage);
        const socket = io;
        socket.emit('message', {user: user.email, message: message});
        res.send({status: 'Ok', payload: result});
    }
}