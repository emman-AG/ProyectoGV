const express = require('express');
const router = express.Router();

//conexión base de datos
const db = require('../database')

//ruta /links/add debido a index--rutes
router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/ad', async (req,res) =>{
    const {title, url, description} = req.body;
    const newLinks = {
        title,
        url,
        description
    };    
    await db.query('INSERT INTO links set ?', [newLinks]);
    res.send('recived');
});

module.exports = router;