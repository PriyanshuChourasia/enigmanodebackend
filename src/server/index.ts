import {Express} from "express";
import helmet from "helmet";
import http from "http";
import {Server} from "socket.io";
import { env } from "../config/env.config";

const port = env.PORT;

export function initializeApp(app:Express){
    app.use(helmet());

    const server = http.createServer(app);
    const io = new Server(server,{
        cors:{
            origin: '*',
            methods: ['GET',"POST"]
        }
    });

    io.on('connection',(socket)=>{
        // console.log('A user connected: ',socket.data);
        console.log('A user connected: ',socket.id);
        console.log('A user connected: ',socket.conn);


        
        socket.on('sendMessage',(message)=>{
            console.log("message",message);
            io.emit("responseMessage","This is me");
        });

        socket.on('disconnect',()=>{
            console.log('A user disconnected');
        });
    });

    server.listen(port,()=>{
        console.log(`Server listening at port ${port}`);
    });
};



/**
 * event name: sendMessage;
 * event name: receivedMessage;
 * userId:1234
 * userId:1235
 * const messageObject = {
 *  userId: 1234
 * }
 * 
 * 
 */