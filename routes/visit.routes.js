const express = require('express');
const router = express.Router();
const {createVisit, updataVisit, getAllVisits} = require('../controllers/visits.controllers');

router.get('/', getAllVisits);

router.post('/', createVisit);

router.patch('/', updataVisit);
