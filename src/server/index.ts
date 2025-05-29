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
            origin: 'http://localhost:5714',
            methods: ['GET',"POST"]
        }
    });

    io.on('connection',(socket)=>{
        console.log('A user connected: ',socket.id);

        
        
        socket.on('sendMessage',(message)=>{
            io.emit('receive Message', message);
        });

        socket.on('disconnect',()=>{
            console.log('A user disconnected');
        });
    });

    server.listen(port,()=>{
        console.log(`Server listening at port ${port}`);
    });
}