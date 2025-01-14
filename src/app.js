const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes/index.js');

require("./db.js");

const server = express();
server.name = "SERVER LIBRO";

// Configuración de CORS
const allowedOrigins = ['https://gscabral.github.io', 'https://libros-back.vercel.app'];

server.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.sendStatus(204);
    }
    next();
});

// Manejo explícito de solicitudes preflight
server.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', 'true');
        console.log('Solicitud preflight manejada.');
        return res.sendStatus(204);
    }
    next();
});

// Configuración de body-parser
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());

// Middleware para registrar cada solicitud al servidor
server.use((req, res, next) => {
    console.log(`Solicitud entrante: ${req.method} ${req.url}`);
    next();
});

// Ruta de prueba CORS
server.get('/test-cors', (req, res) => {
    res.send('CORS configurado correctamente.');
});

// Middleware global para las rutas
server.use("/", routes);

// Manejo de errores con logs
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    console.error(`Error detectado: ${message} (status: ${status})`);
    res.status(status).send(message);
});

module.exports = server;
