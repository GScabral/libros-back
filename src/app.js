const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes/index.js');

require("./db.js");

const server = express();
server.name = "SERVER LIBRO";

// Configuración de CORS
const allowedOrigins = ['http://localhost:3007', 'https://gscabral.github.io'];

server.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Permite la solicitud
        } else {
            callback(new Error('Not allowed by CORS')); // Bloquea la solicitud si el origen no es válido
        }
    },
    credentials: true, // Permitir envío de cookies u otros encabezados de autenticación
    methods: 'GET, POST, OPTIONS, PUT, DELETE, PATCH', // Métodos permitidos
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Encabezados permitidos
    preflightContinue: false, // Finaliza la solicitud OPTIONS directamente
}));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.options('*', cors()); // Habilitar CORS para solicitudes preflight


// Middleware global para las rutas
server.use("/", routes);

// Manejo de errores
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;
