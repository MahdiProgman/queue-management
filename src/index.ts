import api from './api/index.js';
import http from 'http';
import { dataBase } from './config/db.js';
import { connectToDB } from './config/db.js';
import dotenv from 'dotenv';
import runStartupFunctions from './runStartupFunctions.js';
import AppointmentTimeModel from './models/appointmentTime.js';

dotenv.config();

const server : http.Server = http.createServer(api);

connectToDB();

dataBase.sync({ alter : true })
.then(async ()=> {
    await runStartupFunctions();
    console.log('Database synced and relationships established');
    
})
.catch((err)=> {
    console.log('Error During Database sync and relationships establish');
});

const port : number = parseInt(process.env.API_PORT as string) || 3000;

server.listen(port, () : void => {
    console.log(`Server Is Running On Port ${port}`);
});