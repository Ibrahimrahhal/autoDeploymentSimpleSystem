import { RequestHandler, Response, Request } from "express";
import path from 'path';
import Config from './config';
import { sign } from 'jsonwebtoken';
export const allHanders:RequestHandler = 
(req:Request, res:Response) :void =>{
    res.sendStatus(404);
}

export const getSiteHandler:RequestHandler =
(req:Request, res:Response) :void =>{
    res.sendFile(path.resolve(`${__dirname}/../pages/index.html`));
}

export const loginHandler:RequestHandler = 
(req:Request, res:Response) :void =>{
    const { username, password } = req.body;
    if(Config['app-username'] != username && Config['app-password'] != password ){
        res.sendStatus(401);
        return;        
    }
    res.cookie("token", sign({ username:Config['app-username'] }, Config["jwt-secret"]));
}
