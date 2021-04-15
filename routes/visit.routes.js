const express = require('express');
const router = express.Router();
const {createVisit, updataVisit, getAllVisits} = require('../controllers/visits.controllers');
const authenticated = require('../middleware/auth.middleware');

router.get('/', getAllVisits);

router.post('/', createVisit);

router.patch('/:id', updataVisit);

module.exports = router;