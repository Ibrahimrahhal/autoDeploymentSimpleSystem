import express, { Application } from "express";
import { allHanders } from './routeHandlers';
const app:Application = express();

app.all('/', allHanders)

app.listen(3000,(err)=>{
console.log(err)
});