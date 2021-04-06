const express = require('express');
const {getAllVisitors, getVisitor, createVisitor, updateVisitor, deleteVisitor} = require('../controllers/visitors.controllers');
const visitorsControllers = require('../controllers/visitors.controllers');
const authenticated = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', visitorsControllers.getAllVisitors);

router.get('/:id', authenticated, getVisitor);

router.post('/', authenticated, createVisitor);

router.patch('/', authenticated, updateVisitor);

router.delete('/:id', authenticated, deleteVisitor);

module.exports = router;