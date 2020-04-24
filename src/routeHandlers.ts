import { RequestHandler, Response, Request } from "express";

export const allHanders:RequestHandler = 
(req:Request, res:Response) :void =>{
res.send("hello");
}
