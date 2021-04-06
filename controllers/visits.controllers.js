const mongoose = require('mongoose');
const visitModel = require('../models/visit.model');


// create a new visit in the database
exports.createVisit = async (req, res) =>
{
    const {visitor, visited, organization, relationship, reason, a_time, d_time, duration} = req.body;
    
    try {
        const newVisit = new visitModel({
            visitor,
			visited,
			organization,
			relationship,
            reason,
            a_time,
			d_time,
			duration,
        });
        
        const savedVisit = await newVisit.save();
        res.status(201).json(savedVisit);
    } catch (error) {
        res.status(409).json({msg: error.message});
        console.log(error);
    }
}

// get all visits data from the database
exports.getAllVisits = async (req, res) =>
{
    try {
        const allVisits = await visitModel.find();
        res.status(200).json(allVisits);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }

}

// update visit time in the database
exports.updataVisit = async (req, res) =>
{
    const {a_time, d_time, duration} = req.body;
    const {id} = req.params;

    try {
        if (!req.userId) return res.json({msg: "you're not authenticated"});
        const updatedVisit = await visitModel.findByIdAndUpdate(id, {a_time, d_time, duration});
        res.status(200).json(updatedVisit);
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}