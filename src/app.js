const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors'); // Importar cors
const router = require('./routes/index'); // Importar las rutas

const server = express();

// Implementar Helmet para mejorar la seguridad HTTP
server.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://gscabral.github.io'],
                connectSrc: ["'self'", 'https://gscabral.github.io', 'https://libros-back.vercel.app'],
            },
        },
    })
);
// Configuración de body-parser
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());


const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://gscabral.github.io',
            'http://localhost:5173', // Opcional para pruebas locales
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS bloqueado para el origen: ${origin}`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
};

server.use(cors(corsOptions));


server.use(cors(corsOptions)); // Aplicar el middleware de CORS

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
