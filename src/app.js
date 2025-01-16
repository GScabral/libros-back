const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet'); // Middleware de seguridad
const routes = require('./routes');

const server = express();

// Implementar Helmet para mejorar la seguridad HTTP
server.use(helmet());

// Middleware para configurar CORS de forma más segura
server.use(cors({
    origin: 'https://gscabral.github.io', // Define específicamente el origen permitido
    credentials: true, // Permitir envío de cookies o encabezados personalizados
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Cabeceras permitidas
}));

// Configuración de body-parser
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

// Configuración de cookie-parser
server.use(cookieParser());

// Middleware para registrar solicitudes
server.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Ruta principal
server.get('/', (req, res) => {
    res.send('Bienvenido al backend de Proyecto Libros');
});

// Ruta de prueba CORS
server.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS configurado correctamente.' });
});

// Middleware global para las rutas
server.use("/api", routes); // Asegúrate de que las rutas estén bajo /api

// Middleware para manejar rutas no encontradas
server.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware global para manejar errores
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Algo salió mal';
    console.error(`[Error] Status: ${status}, Message: ${message}`);
    res.status(status).json({ error: message });
});

// Exportar el servidor
module.exports = server;
