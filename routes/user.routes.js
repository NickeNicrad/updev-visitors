const express = require('express');
const router = express.Router();
const {updateUser, updateUserPassword} = require('../controllers/user.controllers');

router.patch('/:id', updateUser);

router.patch('/:id', updateUserPassword);

module.exports = router;