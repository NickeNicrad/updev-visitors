const mongoose = require('mongoose');
const visitors = require('../models/visitors.model');

// create a new visitor in the database
exports.createVisitor = async (req, res) => {
    const {fname, lname, email, phone, address} = req.body;
    try {
        if (!fname || !lname || !email) return res.status(400).json({msg: "provide at least visitor's names and email address"});

        visitors.findOne({email}).then(async (visitor) => {
            if (visitor) return res.status(409).json({msg: 'email already exist'});

            const newVisitor = new visitors({
                creatorId: req.userId,
                fname,
                lname,
                email,
                phone,
                address,
            });
            const savedVisitor = await newVisitor.save();
            res.status(201).json(savedVisitor);
        });
    } catch (error) {
        res.status(409).json({msg: error.message});
    }
}

// get all visitors registerd in the database
exports.getAllVisitors = async (req, res) => {
    try {
        const allVisitors = await visitors.find();
        res.status(200).json(allVisitors);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

// get a single visitor from the database
exports.getVisitor = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const visitor = await visitors.findById(id);
        res.status(200).json(visitor);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

// delete an existing visitor from the database
exports.deleteVisitor = async (req, res) => {
    const {id} = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('no visitor corresponding to this id');
        const deletedVisitor = await visitors.findByIdAndRemove(id);
        res.status(200).json(deletedVisitor);
    }
    catch (error) {
        res.status(404).json({msg: error.message})
    }
}

// update an existing visitor in the database
exports.updateVisitor = async (req, res) => {
    const {fname, lname, email, phone, address} = req.body;
    const {id} = req.params;
    try {
        if (!req.userId) return res.json({msg: "you're not authenticated"})
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('no visitor corresponding to this id');
        const updatedVisitor = await visitors.findByIdAndUpdate(id, {fname, lname, email, phone, address});
        res.status(200).json(updatedVisitor);
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}