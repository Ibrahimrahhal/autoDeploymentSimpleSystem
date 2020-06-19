import express, { Application } from "express";
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import { allHanders, getSiteHandler } from './routeHandlers';

const app:Application = express();

app.use(CookieParser());
app.use(BodyParser());
app.use("/",express.static(`${__dirname}/../public`));

app.get('/', getSiteHandler)

app.all('/', allHanders)

app.listen(3000);