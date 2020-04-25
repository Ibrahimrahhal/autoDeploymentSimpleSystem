import express, { Application } from "express";
import { allHanders, getSiteHandler } from './routeHandlers';
import { Server } from 'http';
import SocketHandler from './socketHandler';

const app:Application = express();
const server:Server = new Server(app);

SocketHandler.initSocket(server);

app.use(express.static('../public'));

app.get('/', getSiteHandler)

app.all('/', allHanders)

server.listen(3000);