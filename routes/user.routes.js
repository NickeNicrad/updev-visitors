const express = require('express');
const router = express.Router();
const {updateUser, updateUserPassword, getMyProfile} = require('../controllers/user.controllers');

router.patch('/:id', updateUser);

router.patch('/:id', updateUserPassword);

router.get('/:id', getMyProfile);

module.exports = router;