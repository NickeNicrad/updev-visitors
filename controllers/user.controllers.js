const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const userModel = require('../models/auth.model');

const upload = multer();

upload.single()

exports.updateUserPassword = async (req, res) =>
{
    const {password, newPass} = req.body;
    const {id} = req.params;
    try
    {
        const currentPass = await userModel.findById(id);

        const isPasswordCorrect = await bcrypt.compare(password, currentPass.password);
        if (isPasswordCorrect === false) return res.status(403).json({msg: "incorrect password"});
        await userModel.findByIdAndUpdate(id, {password: newPass});
        res.status(200).json({msg: "password successfully changed!"});
    } catch (error) {
        res.status(404).json({msg: "user were not found"});
    }
}

exports.updateUser = async (req, res) =>
{
    const {pr_image, fname, lname, email, phone, address} = req.body;
    const {id} = req.params;
    try {
        if (!req.userId) return res.json("you're not authenticated!");
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "no user corresponding to this id"});
        const updatedUser = await userModel.findByIdAndUpdate(id,
            {pr_image, fname, lname, email, phone, address});
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({msg: 'something went wrong', err: error.message});
    }
}