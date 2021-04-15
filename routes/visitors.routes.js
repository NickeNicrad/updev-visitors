const express = require('express');
const {getAllVisitors, getVisitor, createVisitor, updateVisitor, deleteVisitor} = require('../controllers/visitors.controllers');
const authenticated = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', getAllVisitors);

router.get('/:id', getVisitor);

router.post('/', createVisitor);

router.patch('/:id', updateVisitor);

router.delete('/:id', deleteVisitor);

module.exports = router;