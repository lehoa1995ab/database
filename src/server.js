import dotenv from 'dotenv';
dotenv.config();

import express from 'express'; 
const server = express() 

import cors from 'cors';
server.use(cors());

import bodyParser from 'body-parser';
server.use(bodyParser.json())

import routerConfig from './routes'
server.use('/api', routerConfig
)

server.listen(process.env.PORT,()=>{
    console.log("server chay tai port",process.env.PORT);
})