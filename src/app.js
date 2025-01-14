const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes/index.js');

require("./db.js");

const server = express();
server.name = "SERVER LIBRO";

// Configuración de CORS
const allowedOrigins = [
    'http://localhost:3007', // Para desarrollo local
    'https://gscabral.github.io' // Dominio del frontend en GitHub Pages
];

// Middleware de CORS con logs para depuración
server.use(cors({
    origin: (origin, callback) => {
        console.log(`Solicitud desde origen: ${origin}`); // Log del origen que realiza la solicitud
        if (!origin || allowedOrigins.includes(origin)) {
            console.log(`Origen permitido: ${origin || "Sin origen (probablemente localhost)"}`);
            callback(null, true); // Permite la solicitud
        } else {
            console.error(`Origen bloqueado por CORS: ${origin}`);
            callback(new Error('Not allowed by CORS')); // Bloquea la solicitud si el origen no es válido
        }
    },
    credentials: true, // Permitir envío de cookies u otros encabezados de autenticación
    methods: 'GET, POST, OPTIONS, PUT, DELETE, PATCH', // Métodos HTTP permitidos
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Encabezados permitidos
}));

server.options('*', cors()); // Habilitar CORS para solicitudes preflight

// Configuración de body-parser
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());

// Middleware para registrar cada solicitud al servidor
server.use((req, res, next) => {
    console.log(`Solicitud entrante: ${req.method} ${req.url}`);
    next();
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
