const express= require("express");
const cookieParser=require('cookie-parser');
const bodyParser=require("body-parser");
const cors=require("cors")
const path = require("path")
const routes= require('./routes/index.js')

require("./db.js");

const server=express();
server.name="SERVER LIBRO";

server.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
server.use(bodyParser.json({limit:'50mb'}))
server.use(cookieParser())
server.use(cors());

server.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3007');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH'); //esto son las acciones que le perimito hacer a mi back mediante solicitudes del front
    next();
})

server.use("/",routes);

server.use((err,req,res,next)=>{
    const status= err.status || 500;
    const  message=err.message || 'Somenthing went wrong';
    console.error(err);
    res.status(status).send(message)
})

module.exports =server;