const express = require('express');
const router = express.Router();

const usersController = require('../controllers/teachers.js');

//const { isAuthenticated } = require('../middleware/authenicate');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateteacher);
router.delete('/:id', usersController.deleteteacher);

module.exports = router;