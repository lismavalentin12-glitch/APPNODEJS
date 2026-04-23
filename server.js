require('dotenv').config(); //Acceder al puerto
const express = require('express'); //Framework

//Mecanismo de seguridad, permite el backend especisificar origenes permtidos
const cors = require('cors');

//Gestión de rutas seguras y compatibles. Windows y Linux, MacOS /
const path = require('path'); //Manejo de rutas

//Puerto donde se ejectuta nuestro servidor
const app = express(); //Referencia
const PORT = process.env.PORT || 3000;


//1. MIDDLEWARES (funcion intermedia)
app.use(cors()); //backend - frontend
app.use(express.json()); //api
app.use(express.urlencoded({ extended: true })); //formulario

//Archivos estaticos servir (frontend)
app.use(express.static(path.join(__dirname, 'public'))); 

//Rutas (API) Test: Postaman
app.use('/api/productos', require('./routes/productos'));
app.use ('/api/marcas', require('./routes/marcas'));

//3. Todoo lo que no tiene ruta o el servidor no lo direccionar 
//SPA = Single page application -> hhtp://localhost:3000/
//Express V4: app.get('*', () => {})
//Express V5: app.get('/{*path}', () => {})

app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

//Manejador de errores 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

//Iniciar el servidor
app.listen(PORT, () => {
    //URL: Aplicacion WEB
    console.log(`Servidor Web ejecutandose en http://localhost:${PORT}`);
    //API productos
    console.log(`API Productos  en http://localhost:${PORT}/api/productos`);
    //API marcas
    console.log(`API Marcas  en http://localhost:${PORT}/api/marcas`);
});

module.exports = app; //Exportar para pruebas unitarias
