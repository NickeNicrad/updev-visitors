const express = require('express');
const router = express.Router();
const {createVisit, updataVisit, getAllVisits} = require('../controllers/visits.controllers');
const authenticated = require('../middleware/auth.middleware');

router.get('/', getAllVisits);

router.post('/', authenticated, createVisit);

router.patch('/:id', authenticated, updataVisit);

module.exports = router;