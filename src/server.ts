import express from "express";
import cors from "cors";
import  * as http from "http";
import mongoose from "mongoose";
import bodyParser from 'body-parser';


import router from './routes/services';

export class Server {
    public static readonly PORT:number = 8080;
    private app: express.Application;
    private server: http.Server;
    private port: string| number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.dbconnect();
        this.listen();
    }

    private createApp():void {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('',router);
        this.app.use( bodyParser.json() );
        this.app.use(express.urlencoded({extended: false}));
    }

    private config(): void {
        this.port = process.env.PORT || Server.PORT;
    }

    private createServer() {
        this.server = http.createServer(this.app);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log("Running server on port %s", this.port);
        });
    }

    private dbconnect() {
        mongoose.connect('mongodb://localhost:27017/pruebaminimouno', (error)=>{
            if(!error)
            {
                console.log('Connection w/ DB Succesful!');
            }
            else
            {
                console.log('Connection Error w/DB');
            }
        })
    }

    public getApp(): express.Application {
        return this.app;
    }
}
