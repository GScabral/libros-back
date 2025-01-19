const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet'); // Importar helmet
const routes = require('./routes');

const server = express();

// Implementar Helmet para mejorar la seguridad HTTP
server.use(helmet());

// Middleware para configurar CORS
const allowedOrigins = ['https://gscabral.github.io/Proyectos-libros/', 'http://localhost:5173'];

server.use(cors({
    origin: function (origin, callback) {
        console.log(`Solicitud de origen: ${origin}`); // Log de origen de la solicitud
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            console.log(msg); // Log de mensaje de error de CORS
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
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