const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const router = require('./routes/index'); // Importar las rutas

const server = express();

// Implementar Helmet para mejorar la seguridad HTTP
server.use(helmet({
    contentSecurityPolicy: false, // Desactivado si interfiere con CORS
}));

// Configuración de body-parser
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());

// Middleware para configurar manualmente los encabezados CORS
const allowedOrigins = [
    'https://gscabral.github.io/Proyectos-libros/', // Tu frontend alojado en GitHub Pages
    'http://localhost:5173', // Para pruebas locales (opcional)
    'https://libros-back.vercel.app' // Si necesitas otra URL para tu backend
];

server.use((req, res, next) => {
    const origin = req.headers.origin;
    console.log(`Solicitud de origen: ${origin}`); // Depurar el origen
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE,PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
        console.error(`CORS denegado para el origen: ${origin}`); // Registrar el error
    }
    next();
});

// Middleware para registrar cada solicitud al servidor
server.use((req, res, next) => {
    console.log(`Solicitud entrante: ${req.method} ${req.url}`);
    console.log('Cabeceras:', req.headers); // Cabeceras de la solicitud
    next();
});

// Ruta para la raíz del servidor
server.get('/', (req, res) => {
    res.send('Bienvenido al backend de Proyecto Libros');
});

// Ruta de prueba para verificar CORS
server.get('/test-cors', (req, res) => {
    console.log('Solicitud recibida en /test-cors');
    res.json({ message: 'CORS configurado correctamente.' });
});

// Middleware global para las rutas
server.use("/api", router);

// Manejo de errores con logs
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Algo salió mal';
    console.error(`Error detectado: ${message} (status: ${status})`);
    res.status(status).send({ error: message });
});

module.exports = server;