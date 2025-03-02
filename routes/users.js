const express = require('express');
const router = express.Router();

router.get('/new', async (req, res) => {
    res.render('users/new');
});

router.post('/', async (req, res) => {
    console.log(req.body.name);
    res.send('Usuario criado');
});

router.route('/:id')
    .get(async (req, res) => {
        console.log(req.user);
        res.send('usuario ' + req.params.id);
    }
    ).put(async (req, res) => {
        res.send('usuario ' + req.params.id + ' atualizado');
    }
    ).delete(async (req, res) => {
        res.send('usuario ' + req.params.id + ' deletado');
    })

const users = [
    { name: "John" },
    { name: "Doe" },
    { name: "Jan" }
];
router.param('id', (req, res, next, id) => {
    console.log('param id: ' + id);
    req.user = users[id];
    next();
})

module.exports = router;