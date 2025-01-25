const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes/index'); // Importar las rutas

const server = express();

// Implementar Helmet para mejorar la seguridad HTTP
server.use(helmet({
    contentSecurityPolicy: false, // Desactivado si interfiere con CORS
}));

// Middleware para configurar CORS
const allowedOrigins = [
    'https://gscabral.github.io/Proyectos-libros/',
    'http://localhost:5173',
    'https://libros-back.vercel.app'
];

server.use(cors({
    origin: function (origin, callback) {
        console.log(`Solicitud de origen: ${origin}`); // Log de origen de la solicitud
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            console.log('Origen permitido.');
            return callback(null, true);
        }
        const msg = `CORS denegado para el origen: ${origin}`;
        console.log(msg); // Log del error de CORS
        return callback(new Error(msg), false);
    },
    credentials: true,
    methods: 'GET,POST,OPTIONS,PUT,DELETE,PATCH',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

// Configuración de body-parser
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());

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
    console.error('Detalles del error:', err.stack); // Muestra más detalles del error
    res.status(status).send({ error: message });
});

module.exports = server;
