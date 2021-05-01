const path = require('path');
const router = require('express').Router();
const notesArray = require('../db/db.json');

router.get('/notes', (req, res) => {
    return res.json(notesArray);
});

router.post('/notes', (req, res) => {
    let newNote = req.body;
    notesArray.push(newNote);
    res.json();
});


module.exports = router;
