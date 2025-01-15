const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');

const server = express();

// Middleware para configurar CORS para aceptar todas las solicitudes
server.use(cors({
    origin: '*',
    credentials: true,
    methods: 'GET,POST,OPTIONS,PUT,DELETE,PATCH',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));

// Configuración de body-parser
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());

// Middleware para registrar cada solicitud al servidor
server.use((req, res, next) => {
    console.log(`Solicitud entrante: ${req.method} ${req.url}`);
    next();
});

// Ruta para la raíz del servidor
server.get('/', (req, res) => {
    res.send('Bienvenido al backend de Proyecto Libros');
});

// Ruta de prueba CORS
server.get('/test-cors', (req, res) => {
    res.send('CORS configurado correctamente.');
});

// Middleware global para las rutas
server.use("/api", routes); // Asegúrate de que las rutas estén bajo /api

// Manejo de errores con logs
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    console.error(`Error detectado: ${message} (status: ${status})`);
    res.status(status).send(message);
});

module.exports = server;