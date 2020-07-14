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
    //redirecciona a la pagina de las tarjetas
    res.redirect("/links");
});

router.get('/', async (req, res) => {
    const links = await db.query('SELECT * FROM links');
    //mandamos los datos de la tabla a links/list
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

module.exports = router;