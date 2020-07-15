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
    req.flash('success', 'Link saved successfully');
    //redirecciona a la pagina de las tarjetas
    res.redirect("/links");
});

router.get('/', async (req, res) => {
    const links = await db.query('SELECT * FROM links');
    //mandamos los datos de la tabla a links/list
    res.render('links/list', { links });
});
    //Optenemos el id con la ruta y lo eliminamos 
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link DELETE successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await db.query('SELECT * FROM links WHERE id = ?',[id]);    
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLinks = {
        title,
        description,
        url
    };    
    await db.query('UPDATE links set ? WHERE id= ?', [newLinks, id]);
    req.flash('success', 'Link UPDATED successfully');
    res.redirect('/links');
});

module.exports = router;