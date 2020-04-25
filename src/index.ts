import express, { Application } from "express";
import { allHanders, getSiteHandler } from './routeHandlers';

const app:Application = express();
app.use(express.static('../public'));

app.get('/', getSiteHandler)

app.all('/', allHanders)

app.listen(3000,(err)=>{
console.log(err)
});