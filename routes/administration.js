const express = require('express');
const router = express.Router();

const usersController = require('../controllers/administration.js');

//const { isAuthenticated } = require('../middleware/authenicate');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateAdmin);
router.delete('/:id', usersController.deleteAdmin);

module.exports = router;