const router = require('express').Router();

router.get('/', (req,res) => {res.send('Hi, Welcome to my Primary School Project!');});

router.use('/administration', require('./administration'));

router.use('/', require('./swagger'));

router.use('/teachers', require('./teachers'));


module.exports = router;