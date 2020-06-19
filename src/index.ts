import express, { Application } from "express";
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import { allHanders, getSiteHandler } from './routeHandlers';
import { Server } from 'http';
import SocketHandler from './socketHandler';

const app:Application = express();

app.use(CookieParser());
app.use(BodyParser());
app.use("/",express.static(`${__dirname}/../public`));


app.get('/', getSiteHandler)
app.all('/', allHanders)



const server:Server = new Server(app);
SocketHandler.initSocket(server);

server.listen(3000);
