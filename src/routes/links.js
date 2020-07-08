const express = require('express');
const router = express.Router();

//conexión base de datos
const db = require('../database')

//ruta /links/add debido a index--rutes
router.get('/add', (req, res) => {
    res.render('links/add');
});

module.exports = router;