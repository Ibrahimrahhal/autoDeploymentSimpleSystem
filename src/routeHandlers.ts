import { RequestHandler, Response, Request } from "express";
import path from 'path';

export const allHanders:RequestHandler = 
(req:Request, res:Response) :void =>{
    res.sendStatus(404);
}

export const getSiteHandler:RequestHandler =
(req:Request, res:Response) :void =>{
    res.sendFile(path.resolve(`${__dirname}/../pages/index.html`));
}
