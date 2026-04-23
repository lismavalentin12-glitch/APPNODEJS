const express = require('express');
const router = express.Router();
const db = require('../config/db'); //Importar conexión a la base de datos

//Retorna todas las marcas 
router.get('/', async(req, res) => {
    res.status(200).json({ succes: true, message: 'Metodo GET' });
});

module.exports = router;