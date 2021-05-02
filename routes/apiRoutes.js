const router = require('express').Router();
const store = require('../db/store');

router.get('/notes', (req, res) => {
    store.returnAll()
    .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => {
        console.log(err)
    })
    
});

router.post('/notes', (req, res) => {
    store.createNote(req.body)
    .then(note => {
        return res.json(note);
    })
    .catch(err => {
        console.log(err);
    })
})
module.exports = router;
