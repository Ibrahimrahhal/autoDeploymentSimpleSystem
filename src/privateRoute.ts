import { RequestHandler, Response, Request, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import Config from './config';

function makeRoutePrivate(routeHandler:RequestHandler):RequestHandler{

    return (req:Request, res:Response, next:NextFunction) :void =>{
            let token  = (req as any).cookies.token;
            if(!token){
                res.sendStatus(401);
                return;
            }
            try {
                verify(token, Config["jwt-secret"]);
              } catch(err) {
                res.sendStatus(401);
                return;
              }
            
            routeHandler(req, res, next);

    }    
}


export default makeRoutePrivate;